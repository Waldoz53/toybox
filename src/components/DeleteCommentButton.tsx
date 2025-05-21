'use client';

import { deleteComment } from '@/app/actions';
import useLoading from '@/app/context/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

type Comment = {
  commentId: string;
};

type Props = Comment;

export default function DeleteCommentButton({ commentId }: Props) {
  const router = useRouter();
  const { setLoading } = useLoading();

  async function handleDeleteComment() {
    setLoading(true);
    await deleteComment(commentId).then((res) => {
      if (res !== '') {
        console.log(res);
      }
      router.refresh();
      setLoading(false);
    });
  }

  return (
    <button title="Delete this comment" onClick={handleDeleteComment}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}
