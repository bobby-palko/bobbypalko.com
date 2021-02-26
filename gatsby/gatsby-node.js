import path from 'path';

async function turnPostsIntoPages({ graphql, actions }) {
  // get a template for the page
  const postTemplate = path.resolve('./src/templates/Post.js');
  // query all our posts
  const { data } = await graphql(`
    query {
      posts: allSanityPost {
        nodes {
          title
          slug {
            current
          }
        }
      }
    }
  `);
  data.posts.nodes.forEach((post) => {
    actions.createPage({
      path: `blog/${post.slug.current}`,
      component: postTemplate,
      context: {
        title: post.title,
        slug: post.slug.current,
      },
    });
    console.log(`${post.title} page created!`);
  });
}

export async function createPages(params) {
  await turnPostsIntoPages(params);
}
