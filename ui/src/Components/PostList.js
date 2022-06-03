import React from 'react';
import Post from './Post'
import Stack from '@mui/material/Stack';

import {SpinningCircles} from 'react-loading-icons'

const PostList=({updateFn,deleteFn,entryList})=> {
    let compiledPosts = entryList.map((element)=>(
        <Post key={`Post_${element.id}`} updateFn={updateFn} deleteFn={deleteFn} entry={element}/>
    ))
    if (entryList.length===0) {
        return(<SpinningCircles/>)
    } else {
        return ([<Stack 
                key="stack_1"
                direction="column" 
                spacing={1}
                alignItems="center"
                justifyContent="center"
                margin={2}>
                { compiledPosts }
            </Stack>])
    }
}

import PropTypes from 'prop-types';
PostList.propTypes = {
  open: PropTypes.bool,
  entryList: PropTypes.array,
  updateFn:PropTypes.func,
  deleteFn:PropTypes.func
}

export default PostList;
