test('fetch should work with polyfill', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();

  expect(data).toHaveProperty('id', 1);
});
