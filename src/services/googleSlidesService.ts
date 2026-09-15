import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { SlideContent } from '../types';

// The configured OAuth scopes for Google Slides & Drive
export const SCOPES = [
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/drive.file',
];

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach(scope => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Google Sign-in failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const googleSignOut = async () => {
  cachedAccessToken = null;
  await signOut(auth);
};

export const getCachedAccessToken = () => cachedAccessToken;

/**
 * Creates an actual Google Slides presentation on Google Drive using the Google Slides API
 */
export async function exportToGoogleSlides(
  title: string,
  slides: SlideContent[],
  accessToken: string,
  onProgress?: (current: number, total: number, message: string) => void
): Promise<{ presentationId: string; presentationUrl: string }> {
  onProgress?.(1, slides.length, 'جاري إنشاء ملف العرض التقديمي في Google Slides...');

  // Step 1: Create Presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `${title} - مشروع تحليل وتصميم الخوارزميات`,
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `فشل إنشاء العرض في Google Slides (كود ${createRes.status})`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;

  // Step 2: Batch add slides
  // We chunk requests because Google Slides batchUpdate accepts up to reasonable payload limits
  const CHUNK_SIZE = 10;
  const totalChunks = Math.ceil(slides.length / CHUNK_SIZE);

  for (let chunkIdx = 0; chunkIdx < totalChunks; chunkIdx++) {
    const chunk = slides.slice(chunkIdx * CHUNK_SIZE, (chunkIdx + 1) * CHUNK_SIZE);
    onProgress?.(
      Math.min(slides.length, (chunkIdx + 1) * CHUNK_SIZE),
      slides.length,
      `جاري توليد الشرائح ${chunkIdx * CHUNK_SIZE + 1} إلى ${Math.min(slides.length, (chunkIdx + 1) * CHUNK_SIZE)}...`
    );

    const requests: any[] = [];

    chunk.forEach((slide) => {
      const pageId = `slide_p_${slide.id}_${Date.now().toString(36)}`;
      const titleBoxId = `title_${pageId}`;
      const bodyBoxId = `body_${pageId}`;

      // 1. Create Slide
      requests.push({
        createSlide: {
          objectId: pageId,
          slideLayoutReference: {
            predefinedLayout: 'BLANK',
          },
        },
      });

      // 2. Insert Title TextBox
      requests.push({
        createShape: {
          objectId: titleBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: pageId,
            size: {
              width: { magnitude: 650, unit: 'PT' },
              height: { magnitude: 60, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 35,
              translateY: 30,
              unit: 'PT',
            },
          },
        },
      });

      // 3. Set Title Text
      requests.push({
        insertText: {
          objectId: titleBoxId,
          text: `[${slide.numberStr}] ${slide.title}\n${slide.subtitle || ''}`,
          insertionIndex: 0,
        },
      });

      // 4. Insert Body TextBox
      requests.push({
        createShape: {
          objectId: bodyBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: pageId,
            size: {
              width: { magnitude: 650, unit: 'PT' },
              height: { magnitude: 300, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 35,
              translateY: 100,
              unit: 'PT',
            },
          },
        },
      });

      // 5. Body Text with bullet points
      const bodyLines = [
        `المتطلب الأكاديمي: ${slide.pillar}`,
        slide.formula ? `المعادلة الرياضية: ${slide.formula}` : '',
        '',
        ...slide.keyPoints.map(p => `• ${p}`),
        slide.notes ? `\nملاحظات العرض: ${slide.notes}` : '',
      ].filter(Boolean).join('\n');

      requests.push({
        insertText: {
          objectId: bodyBoxId,
          text: bodyLines,
          insertionIndex: 0,
        },
      });
    });

    // Execute batchUpdate
    const updateRes = await fetch(
      `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      }
    );

    if (!updateRes.ok) {
      console.warn('Batch update partial warning on chunk', chunkIdx);
    }
  }

  onProgress?.(slides.length, slides.length, 'اكتمل إنشاء العرض التقديمي بنجاح!');

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}
