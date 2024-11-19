document.getElementById('addBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const label = document.createElement('label');
    
    // Create radio button
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'taskRadio';
    radioButton.addEventListener('change', () => {
      label.classList.toggle('completed', radioButton.checked);
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    label.appendChild(radioButton);
    label.appendChild(span);

    // Create three-dot menu
    const threeDots = document.createElement('span');
    threeDots.className = 'three-dots';
    threeDots.textContent = '⋮';

    const menuOptions = document.createElement('div');
    menuOptions.className = 'menu-options';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(span, menuOptions));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskItem.remove();
      menuOptions.style.display = 'none';
    });

    menuOptions.appendChild(editBtn);
    menuOptions.appendChild(deleteBtn);

    // Toggle menu visibility when clicking the three dots
    threeDots.addEventListener('click', () => {
      menuOptions.style.display = menuOptions.style.display === 'block' ? 'none' : 'block';
    });

    // Close the menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!threeDots.contains(e.target) && !menuOptions.contains(e.target)) {
        menuOptions.style.display = 'none';
      }
    });

    taskItem.appendChild(label);
    taskItem.appendChild(threeDots);
    taskItem.appendChild(menuOptions);

    document.getElementById('todoList').appendChild(taskItem);
    taskInput.value = '';
  }
}

function editTask(taskSpan, menuOptions) {
  const newTaskText = prompt('Edit your task:', taskSpan.textContent);
  if (newTaskText !== null) {
    taskSpan.textContent = newTaskText.trim();
  }
  menuOptions.style.display = 'none';
}
