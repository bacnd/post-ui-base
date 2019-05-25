'use strict';

import postApi from './api/postApi.js';
import AppConstants from './appConstants.js';
import utils from './utils.js';

const renderPostItem = (post) => {
  // Get post item template
  const postItemTemplate = document.getElementById('postItemTemplate');
  const postItemElement = postItemTemplate.content.cloneNode(true);

  // Fill post data to template
  // Set title
  const titleElement = postItemElement.getElementById('postItemTitle');
  if (titleElement) {
    titleElement.innerText = post.title;
  }

  // Set description
  const descriptionElement = postItemElement.getElementById('postItemDescription');
  if (descriptionElement) {
    descriptionElement.innerText = utils.truncateTextlength(post.description, 100);
  }

  // Set image
  const imageElement = postItemElement.getElementById('postItemImage');
  if (imageElement) {
    imageElement.src = post.imageUrl || AppConstants.DEFAULT_IMAGE_URL;
  }

  // Set author
  const authorElement = postItemElement.getElementById('postItemAuthor');
  if (authorElement) {
    authorElement.innerText = post.author;
  }

  // Set created time
  const timeSpanElement = postItemElement.getElementById('postItemTimeSpan');
  if (timeSpanElement) {
    console.log(post.createdAt);
    const timeString = utils.formatDate(post.createdAt);
    timeSpanElement.innerText = ` - ${timeString}`;
  }

  return postItemElement;
};

const resetPostsElementNode = (postsElement) => {
  if (postsElement) {
    while (postsElement.firstChild) {
      postsElement.removeChild(postsElement.firstChild);
    }
  }
}

const renderListOfPosts = (posts) => {
  console.log('Render list of posts: ', posts);
  const postsElement = document.getElementById('postsList');

  if (postsElement) {
    // Clean up current list of posts displayed on UI
    resetPostsElementNode(postsElement);

    // Map each post item -> post item element
    if (Array.isArray(posts)) {
      for (const post of posts) {
        const postItemElement = renderPostItem(post);
        if (postItemElement) {
          postsElement.appendChild(postItemElement);
        }
      }
    }
  } else {
    console.log('Ooops! Can\'t find postsList item');
  }
};

const renderPostsPagination = (pagination) => {
  console.log('Render post pagination: ', pagination);
};



// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  try {
    // Fetch list of posts item
    const response = await postApi.getAll({ _limit: 6 });

    if (response) {
      const { data: posts, pagination } = response;
      renderListOfPosts(posts);
      renderPostsPagination(pagination);
    }
  } catch (error) {
    console.log('Failed to fetch list of posts: ', error);
  }
};

// Start initialization process
init();