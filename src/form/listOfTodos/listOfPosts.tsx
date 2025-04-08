import React from 'react';
import classes from './listOfPosts.module.css';
import { Post } from '../../App/types.ts';

interface ListOfPostsProps {
  posts: Post[];
}

export const ListOfPosts: React.FC<ListOfPostsProps> = ({ posts }) => {
  return (
    <div></div>
  );
};