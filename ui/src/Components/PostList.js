import React from 'react';
import Post from './Post'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {SpinningCircles} from 'react-loading-icons'

const PostList=({updateFn,deleteFn,entryList})=> {

    if (entryList.length===0) {
        return(<Typography>No Entries Available</Typography>)
    } else if(entryList[0]===-1){
        return(<SpinningCircles
            fill="#06bcee"
            fillOpacity={1}
            height="3em"
            speed={1}
            stroke="#06bcee"
            strokeOpacity={1}
            strokeWidth={2}
          />)
    }
    else {
        let compiledPosts = entryList.map((element)=>(
            <Post key={`Post_${element.id}`} updateFn={updateFn} deleteFn={deleteFn} entry={element}/>
        ))
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
