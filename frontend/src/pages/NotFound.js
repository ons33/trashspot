import React from "react";
import './Notfound.css';
function NotFound() {
  const handleClick = () => {
    window.history.back();
  }
      

  return (
    <>
   

   <h1>404 Error Page </h1>
<p class="zoom-area">You’re either misspelling the URL
or requesting a page that's no longer here. </p>
<section class="error-container">
  <span class="four"><span class="screen-reader-text">4</span></span>
  <span class="zero"><span class="screen-reader-text">0</span></span>
  <span class="four"><span class="screen-reader-text">4</span></span>
</section>
<div class="link-container">
  <a target="_blank"  class="more-link" onClick={handleClick}>Back to the previous page</a>
</div>
    </>
  );
}

export default NotFound;
