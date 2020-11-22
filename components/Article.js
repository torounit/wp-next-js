function Article( { post } ) {

  return (
    <article>
      <h1>{ post?.title.rendered }</h1>
      <div
        dangerouslySetInnerHTML={
          { __html: post?.content.rendered }
        }
      />
    </article>
  );
}

export default Article;
