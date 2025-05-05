const fs = require('fs/promises');
const http = require('http');
const EventEmitter = require('events');
const { v4: uuidv4 } = require('uuid');

const logger = new EventEmitter();

logger.on('request', ({ method, url }) => {
  console.log(`[${new Date().toISOString()}],${method},${url}`);
});

const readTask = async () => {
  try {
    const data = await fs.readFile('data/task.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return []; // if file not found or invalid, return empty array
  }
};

const writeTask = async (tasks) => {
  await fs.writeFile('data/task.json', JSON.stringify(tasks, null, 2));
};

// Helper to read body safely
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
    req.on('error', (err) => reject(err));
  });
};

const server = http.createServer((req, res) => {
  logger.emit('request', req);

  (async () => {
    const { method, url } = req;
    const segments = url.split('/').filter(Boolean);

    // GET /tasks or /tasks/:id
    if (method === 'GET' && segments[0] === 'tasks') {
      const tasks = await readTask();
      if (segments[1]) {
        const task = tasks.find((t) => t.id === segments[1]);
        if (!task) {
          res.writeHead(404);
          res.end('Task not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
      }
    }

    // POST /tasks
    else if (method === 'POST' && segments[0] === 'tasks') {
      try {
        const rawBody = await getRequestBody(req);
        console.log("Raw body:", rawBody); // debug

        const task = JSON.parse(rawBody);
        task.id = uuidv4();

        const tasks = await readTask();
        tasks.push(task);
        await writeTask(tasks);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));
      } catch (err) {
        console.error('Invalid JSON:', err.message);
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    }

    // DELETE /tasks/:id
    else if (method === 'DELETE' && segments[0] === 'tasks' && segments[1]) {
      const tasks = await readTask();
      const taskIndex = tasks.findIndex((t) => t.id === segments[1]);

      if (taskIndex === -1) {
        res.writeHead(404);
        res.end('Task not found');
        return;
      }

      tasks.splice(taskIndex, 1);
      await writeTask(tasks);

      res.writeHead(204);
      res.end();
    }

    // Unknown route
    else {
      res.writeHead(404);
      res.end('Not Found');
    }
  })();
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
