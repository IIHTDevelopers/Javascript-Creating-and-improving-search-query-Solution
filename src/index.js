// Simulating a search function that fetches data and improves the search results

async function searchPosts(query, page = 1, limit = 5) {
  try {
    // Creating the search query with query strings (basic query, pagination, and limit)
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&q=${query}`;
    const response = await fetch(url);

    // Checking if the response is OK
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    // Convert the response to JSON
    const posts = await response.json();
    console.log(`Fetched ${posts.length} posts for query: "${query}"`);

    // Improving the search by filtering posts based on a keyword in the title
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));

    // Further improvement: Sorting the posts alphabetically by title
    const sortedPosts = filteredPosts.sort((a, b) => a.title.localeCompare(b.title));

    console.log('Filtered and Sorted Posts:', sortedPosts);

    return sortedPosts;  // Return the final filtered and sorted posts
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Example: Searching for posts containing the word "qui"
searchPosts('qui')
  .then(posts => {
    if (posts.length > 0) {
      posts.forEach(post => console.log(post.title));
    } else {
      console.log('No posts found for the search query.');
    }
  })
  .catch(error => console.error('Error occurred while fetching the posts:', error));
