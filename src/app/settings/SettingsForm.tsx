'use client';

import Toast from '@/components/Toast';
import { useState } from 'react';
import { saveUserSettings } from '../actions';
import ToggleButton from '@/components/ToggleButton';

type Props = {
  initialAllowComments: boolean;
};

export default function SettingsForm({ initialAllowComments }: Props) {
  const [allowComments, setAllowComments] = useState(initialAllowComments);
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    setMessage('');
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    saveUserSettings(formData).then((res) => {
      if (res == 'Settings changed successfully!') {
        setToastType('success');
      } else {
        setToastType('error');
      }
      setMessage(res);
    });
  }

  return (
    <form onSubmit={handleSave}>
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
      <Toast message={message} toastType={toastType} />
    </form>
  );
}
