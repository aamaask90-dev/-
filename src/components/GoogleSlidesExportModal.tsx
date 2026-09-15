import React, { useState, useEffect } from 'react';
import { 
  X, 
  Share2, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  googleSignIn, 
  googleSignOut, 
  initAuth, 
  exportToGoogleSlides, 
  getCachedAccessToken 
} from '../services/googleSlidesService';
import { SLIDES_DATA } from '../data/slidesData';

interface GoogleSlidesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

export const GoogleSlidesExportModal: React.FC<GoogleSlidesExportModalProps> = ({
  isOpen,
  onClose,
  onPrint
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'تعذر تسجيل الدخول بواسطة Google. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleExport = async () => {
    if (!accessToken) {
      setErrorMsg('يرجى تسجيل الدخول بحساب Google أولاً.');
      return;
    }

    setIsExporting(true);
    setErrorMsg(null);
    setCreatedUrl(null);
    setProgressPercent(5);
    setProgressMsg('بدء تهيئة العرض التقديمي في Google Slides...');

    try {
      const result = await exportToGoogleSlides(
        'الملاحة الذكية - A* & Dijkstra',
        SLIDES_DATA,
        accessToken,
        (current, total, msg) => {
          setProgressPercent(Math.round((current / total) * 100));
          setProgressMsg(msg);
        }
      );

      setCreatedUrl(result.presentationUrl);
      setProgressMsg('تم إنشاء العرض بنجاح في Google Slides وحفظه في Google Drive الخاص بك!');
    } catch (err: any) {
      setErrorMsg(err?.message || 'حدث خطأ أثناء تصدير الشرائح إلى Google Slides. يمكنك تنزيل ملف JSON أو طباعة العرض كملف PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SLIDES_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "smart_navigation_slides_40.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-right">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">تصدير إلى Google Slides</h3>
              <p className="text-xs text-slate-400">حفظ الشرائح الـ 40 مباشرة في حساب Google Drive الخاص بك</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-6">
          
          {/* User Status / Sign In Button */}
          {!currentUser ? (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
              <p className="text-sm text-slate-300">
                لتصدير العرض التقديمي مباشرة إلى Google Slides، سجل دخولك بحساب Google للموافقة على إنشاء وحفظ ملف العرض في Google Drive.
              </p>

              {/* Official GSI Styled Button */}
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm shadow-md transition-all disabled:opacity-50 mx-auto"
                dir="ltr"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isSigningIn ? 'جاري الاتصال بـ Google...' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border border-emerald-400" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    {currentUser.displayName?.[0] || 'U'}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.displayName || 'مستخدم Google'}</div>
                  <div className="text-xs text-slate-400 font-mono" dir="ltr">{currentUser.email}</div>
                </div>
              </div>

              <button
                onClick={() => googleSignOut()}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20"
              >
                تسجيل الخروج
              </button>
            </div>
          )}

          {/* Export Action & Progress */}
          {currentUser && !createdUrl && (
            <div className="space-y-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>جاري إنشاء العرض في Google Slides... ({progressPercent}%)</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>بدء التصدير إلى Google Slides الآن</span>
                  </>
                )}
              </button>

              {isExporting && (
                <div className="space-y-2">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-indigo-500 h-2 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 text-center font-mono">{progressMsg}</p>
                </div>
              )}
            </div>
          )}

          {/* Success Link Card */}
          {createdUrl && (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>تم إنشاء العرض التقديمي بنجاح!</span>
              </div>
              <p className="text-xs text-slate-300">
                تم حفظ ملف العرض في حساب Google Drive الخاص بك، ويمكنك فتحه الآن في Google Slides للتعديل أو التقديم.
              </p>
              <a
                href={createdUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-md shadow-emerald-500/20"
              >
                <span>فتح العرض في Google Slides</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Alternative Offline Options */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-2">خيارات بديلة فورية بدون إنترنت:</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadJSON}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>تنزيل الشرائح (JSON)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onPrint();
                }}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>طباعة كـ PDF</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
