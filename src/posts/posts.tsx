import React from 'react';
import classes from './posts.module.css';
import { Post } from '../App/businessLogic/types';

interface PostsProps {
  posts: Post[];
}

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <div className={classes.posts}>
      <div>list Of Death</div>
      {posts.map((post, index) => (
        <div className={classes.post} key={index}>
          <div className={classes.count}>{index}</div>
          <div className={classes.date}>{post.date}</div>
          <div className={classes.title}>{post.title}</div>
          <div className={classes.note}>{post.note}</div>
        </div>      
      ))}
    </div>
  );
};
