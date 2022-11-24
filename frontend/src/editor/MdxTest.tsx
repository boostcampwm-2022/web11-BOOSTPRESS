/*  */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { generate } from './mdxToHTML';
/* eslint-disable import/no-webpack-loader-syntax */
import Content from './sample.mdx';

const MdxTest = () => {
    console.log(Content);
    return <p>{generate('# 안녕')}</p>;
};

export default MdxTest;
