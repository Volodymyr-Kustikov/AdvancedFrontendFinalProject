import React from 'react';
import classes from './listOfPosts.module.css';
import { Post } from '../../App/businessLogic/types';

interface ListOfPostsProps {
  posts: Post[];
}

export const ListOfPosts: React.FC<ListOfPostsProps> = ({ posts }) => {
  return (
    <div></div>
  );
};