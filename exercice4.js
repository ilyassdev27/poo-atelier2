// 1. Définition des classes
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.posts = [];
  }

  addPost(post) {
    this.posts.push(post.id);
    return this;
  }

  toJSON() {
    return {
      username: this.username,
      email: this.email,
      posts: this.posts,
    };
  }

  static fromJSON(json) {
    const user = new User(json.username, json.email);
    user.posts = json.posts || [];
    return user;
  }
}

class Post {
  constructor(id, title, content, author) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      author: this.author,
      createdAt: this.createdAt.toISOString(),
    };
  }

  static fromJSON(json) {
    const post = new Post(json.id, json.title, json.content, json.author);
    post.createdAt = new Date(json.createdAt);
    return post;
  }
}

class Blog {
  constructor() {
    this.users = [];
    this.posts = [];
    this.nextPostId = 1;
  }
  addUser(username, email) {
    const user = new User(username, email);
    this.users.push(user);
    return user;
  }

  createPost(title, content, authorUsername) {
    const author = this.users.find((u) => u.username === authorUsername);
    if (!author) throw new Error("Utilisateur non trouvé");

    const post = new Post(this.nextPostId++, title, content, author.username);
    this.posts.push(post);
    author.addPost(post);
    return post;
  }

  getPostsByUser(username) {
    return this.posts.filter((post) => post.author === username);
  }

  getAllPosts() {
    return [...this.posts].sort((a, b) => b.createdAt - a.createdAt);
  }

  // Sérialisation en JSON
  toJSON() {
    return {
      users: this.users.map((user) => user.toJSON()),
      posts: this.posts.map((post) => post.toJSON()),
      nextPostId: this.nextPostId,
    };
  }

  // Désérialisation depuis JSON
  static fromJSON(json) {
    const blog = new Blog();
    blog.users = json.users.map((userJson) => User.fromJSON(userJson));
    blog.posts = json.posts.map((postJson) => Post.fromJSON(postJson));
    blog.nextPostId = json.nextPostId;
    return blog;
  }

  // Sauvegarde dans localStorage (optionnel)
  saveToLocalStorage() {
    localStorage.setItem("blogData", JSON.stringify(this.toJSON()));
  }

  // Chargement depuis localStorage (optionnel)
  static loadFromLocalStorage() {
    const data = localStorage.getItem("blogData");
    return data ? Blog.fromJSON(JSON.parse(data)) : new Blog();
  }
}

// 2. Utilisation du blog
const blog = new Blog();

// Ajout d'utilisateurs
blog.addUser("alice", "alice@example.com");
blog.addUser("bob", "bob@example.com");

// Création de posts
blog.createPost("Mon premier post", "Contenu du post...", "alice");
blog.createPost("Un autre post", "Encore du contenu...", "bob");
// 3. Conversion en JSON
const blogJSON = JSON.stringify(blog.toJSON());
console.log("Blog en JSON:", blogJSON);

// 4. Reconstitution depuis JSON
const reconstructedBlog = Blog.fromJSON(JSON.parse(blogJSON));
console.log("Posts reconstruits:", reconstructedBlog.getAllPosts());

// 5. Affichage dans la console
console.log("=== Tous les posts ===");
reconstructedBlog.getAllPosts().forEach((post) => {
  console.log(
    `[${post.createdAt.toLocaleString()}] ${post.title} par ${post.author}`
  );
  console.log(`> ${post.content}\n`);
});
