const comments = fetch('/api/comments', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-text').value.trim();
  const url = window.location.href;
  const post_id = url.substring(url.lastIndexOf('/') + 1);

  if (comment && post_id) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const editPostBtnNavHandler = async (event) => {
  event.preventDefault();
  // Navigate to edit post page
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);
  document.location.replace(`/edit/${id}`);
};

const editPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const url = window.location.href;
  const post_id = url.substring(url.lastIndexOf('/') + 1);

  if (title && content && post_id) {
    const response = await fetch(`/api/post/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('/') + 1);

  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const commentForm = document.querySelector('.comment-form');
const editPostBtn = document.querySelector('.edit-post');
const deletePostBtn = document.querySelector('.delete-post');
const editPostForm = document.querySelector('.update-post-form');

if (commentForm) {
  commentForm.addEventListener('submit', commentFormHandler);
}

if (editPostBtn && deletePostBtn) {
  editPostBtn.addEventListener('click', editPostBtnNavHandler);
  deletePostBtn.addEventListener('click', deletePostHandler);
}

if (editPostForm) {
  editPostForm.addEventListener('submit', editPostHandler);
}
