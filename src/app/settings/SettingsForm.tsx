'use client';

import Toast from '@/components/Toast';
import { createClientBrowser } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { saveUserSettings } from '../actions';
import ToggleButton from '@/components/ToggleButton';

export default function SettingsForm() {
  const supabase = createClientBrowser();
  const router = useRouter();

  const [allowComments, setAllowComments] = useState(false);
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadSettings() {
      const { data: user } = await supabase.auth.getUser();

      if (!user.user) {
        router.push('/');
        return;
      }

      // expand table query as more settings are added
      const { data } = await supabase
        .from('settings')
        .select('following_only_comment')
        .eq('user_id', user.user.id)
        .single();

      if (data) {
        setAllowComments(data.following_only_comment);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage('Failed to fetch user settings');
      }
    }

    loadSettings();
    setTimeout(() => {
      setLoading(false);
    }, 30000);
  }, [router, supabase]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    setMessage('');
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    saveUserSettings(formData).then((res) => {
      if (res == 'Settings changed successfully!') {
        setToastType('success');
      }
      setMessage(res);
    });
  }

  return (
    <form onSubmit={handleSave}>
      {!loading ? (
        <>
          {/* Toggle button for mutual follower comments */}
          <ToggleButton
            name={'allowComments'}
            label="Only people I follow can comment on posts"
            checked={allowComments}
            onChange={setAllowComments}
          />

          <div className="settings-input">
            <label htmlFor="newPassword">New Password:</label>
            <input type="password" name="newPassword" />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" />
          </div>

          <button>Save Settings</button>
        </>
      ) : (
        <>
          <span className="loader-transition"></span>
        </>
      )}
      <Toast message={message} toastType={toastType} />
    </form>
  );
}
