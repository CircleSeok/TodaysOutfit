import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getDocs,
  query,
  where,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../api/firebase';

export interface Comment {
  id: string;
  userId: string;
  postType: string;
  postId: string;
  text: string;
  timestamp: { seconds: number; nanoseconds: number };
}

export const useComments = (postType: string, postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  const location = useLocation();

  const fetchComments = async () => {
    try {
      const commentsSnapshot = await getDocs(
        query(
          collection(db, 'comments'),
          where('postType', '==', postType),
          where('postId', '==', postId),
          orderBy('timestamp', 'desc')
        )
      );

      const commentsData = commentsSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Comment)
      );

      setComments(commentsData);
    } catch (error) {
      console.error('댓글 가져오기 에러', error);
    }
  };

  const onSubmitComment = async () => {
    try {
      const userId = auth.currentUser?.uid;

      await addDoc(collection(db, 'comments'), {
        userId: userId,
        postType: postType,
        postId: postId,
        text: commentText,
        timestamp: serverTimestamp(),
      });

      fetchComments();
      setCommentText('');
    } catch (error) {
      console.error('댓글 추가 에러', error);
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, commentText, handleCommentChange, onSubmitComment };
};
