const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Article');

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/moduloback');

  // Eliminar datos existentes
  await User.deleteMany({});
  await Post.deleteMany({});

  // Crear usuarios de prueba
  const user1 = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
  const user2 = new User({ name: 'Jane Doe', email: 'jane@example.com', password: 'password123' });

  await user1.save();
  await user2.save();

  // Crear publicaciones de prueba
  const post1 = new Post({ title: 'First Post', body: 'This is the first post', author: user1._id });
  const post2 = new Post({ title: 'Second Post', body: 'This is the second post', author: user2._id });

  await post1.save();
  await post2.save();

  console.log('Database seeded!');
  mongoose.connection.close();
}

seedDatabase().catch(err => {
  console.error(err);
  mongoose.connection.close();
});