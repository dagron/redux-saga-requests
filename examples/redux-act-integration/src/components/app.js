import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPhotoAction,
  clearPhotoAction,
  deletePhotoAction,
  fetchPostsAction,
  clearPostsAction,
  deletePostAction,
} from '../store/actions';
import EntityContainer from './entity-container';
import Photo from './photo';
import Post from './post';

// You should use selectors here in your real projects, here we don't for simplicity
const mapStateToProps = state => ({
  photo: state.photo,
  posts: state.posts,
  abortCounter: state.abortCounter,
});

const mapDispatchToProps = {
  fetchPhoto: fetchPhotoAction,
  clearPhoto: clearPhotoAction,
  deletePhoto: deletePhotoAction,
  fetchPosts: fetchPostsAction,
  clearPosts: clearPostsAction,
  deletePost: deletePostAction,
};

const buttonStyle = { marginRight: 10 };

const App = ({
  photo,
  posts,
  fetchPhoto,
  clearPhoto,
  deletePhoto,
  fetchPosts,
  clearPosts,
  deletePost,
  abortCounter,
}) => (
  <div>
    <h1>Redux Saga Requests integration with Redux Act example</h1>
    <p>
      In order to see aborts in action, you should set network throttling in
      your browser
    </p>
    <hr />
    <div>
      <span>Abort counter: {abortCounter}</span>
    </div>
    <hr />
    <div>
      <h2>Photo</h2>
      <button style={buttonStyle} onClick={() => clearPhoto()}>
        Clear
      </button>
      <button style={buttonStyle} onClick={() => fetchPhoto(1)}>
        Fetch photo with id 1
      </button>
      <button style={buttonStyle} onClick={() => fetchPhoto(10001)}>
        Fetch non-existent photo
      </button>
      <EntityContainer
        error={photo.error}
        isFetching={photo.pending > 0}
        isFetched={!!photo.data}
      >
        <Photo
          data={photo.data}
          deletePhoto={deletePhoto}
          deleting={photo.operations[deletePhotoAction].pending > 0}
        />
      </EntityContainer>
    </div>
    <hr />
    <div>
      <h2>Post</h2>
      <button style={buttonStyle} onClick={() => clearPosts()}>
        Clear
      </button>
      <button style={buttonStyle} onClick={() => fetchPosts()}>
        Fetch posts
      </button>
      <EntityContainer
        error={posts.error}
        isFetching={posts.pending > 0}
        isFetched={posts.data.length > 0}
      >
        {posts.data.map(post => {
          const operation = posts.operations[deletePostAction][post.id];

          return (
            <Post
              key={post.id}
              data={post}
              deletePost={() => deletePost(post.id)}
              deleting={operation && operation.pending > 0}
            />
          );
        })}
      </EntityContainer>
    </div>
    <hr />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
