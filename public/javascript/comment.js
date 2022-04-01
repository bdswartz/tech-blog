async function commentFormHandler(event) {
    event.preventDefault();
  
    const comments = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comments) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment_contents
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
      
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  