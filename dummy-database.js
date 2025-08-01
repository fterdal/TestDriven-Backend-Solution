/**
 * Our dummy database has two tables: tasks and users
 * You DO NOT need to edit this file. But please do read it, and understand the methods you can use.
 * For instance, if you want to create a new task, you can do:
 * const task = Task.create({
 *   title: "Fold Laundry",
 *   description: "Fold all the laundry in the laundry room",
 *   completed: false,
 *   userId: 1,
 * });
 * If you want to delete a task, you can do:
 * Task.delete(1);
 */

/**
 * Task.findAll() -> returns all tasks
 * Task.findByPk(id) -> returns a single task by id
 * Task.create(task) -> creates a new task
 * Task.update(id, task) -> updates a task by id
 * Task.delete(id) -> deletes a task by id
 *
 * User.findAll() -> returns all users
 * User.findByPk(id) -> returns a single user by id
 * User.create(user) -> creates a new user
 * User.update(id, user) -> updates a user by id
 * User.delete(id) -> deletes a user by id
 */

/**
 * Each task has:
 * - id
 * - title
 * - description
 * - completed
 * - userId
 */

/**
 * Each user has:
 * - id
 * - name
 */

const tasks = [
  {
    id: 1,
    title: "Fold Laundry",
    description: "Fold all the laundry in the laundry room",
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: "Wash Dishes",
    description: "The dishes are starting to gain sentience",
    completed: true,
    userId: 2,
  },
];
let nextTaskId = tasks.length + 1;

const users = [
  { id: 1, name: "Finn" },
  { id: 2, name: "Shahid" },
];
let nextUserId = users.length + 1;

const Task = {
  findAll: function () {
    return tasks;
  },
  findByPk: function (id) {
    return tasks.find((task) => task.id === id);
  },
  create: function (task) {
    task.id = nextTaskId++;
    tasks.push(task);
    return task;
  },
  update: function (id, task) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    console.log("Updating task", tasks[index]);
    console.log("With task", task);
    tasks[index] = { ...tasks[index], ...task };
    return task;
  },
  delete: function (id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
  },
};

const User = {
  findAll: function () {
    return users;
  },
  findByPk: function (id) {
    return users.find((user) => user.id === id);
  },
  create: function (user) {
    user.id = nextUserId++;
    users.push(user);
    return user;
  },
  update: function (id, user) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users[index] = { ...users[index], ...user };
    return user;
  },
  delete: function (id) {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);
  },
};

module.exports = { Task, User };
