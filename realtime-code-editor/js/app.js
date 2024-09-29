document.addEventListener('DOMContentLoaded', function () {
    const editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
      lineNumbers: true,
      mode: "javascript",
      theme: "default"
    });
  
    // Sample messages list (just for demo)
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
  
    // Function to add a message to the chat
    function addMessage(text) {
      const li = document.createElement('li');
      li.textContent = text;
      li.classList.add('list-group-item');
      messages.appendChild(li);
      messages.scrollTop = messages.scrollHeight;
    }
  
    // Simulate real-time message sending (local, no server)
    messageInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' && messageInput.value.trim() !== '') {
        addMessage(`You: ${messageInput.value}`);
        messageInput.value = '';  // Clear input field
      }
    });
  
    // Simulate real-time code synchronization (local, no server)
    editor.on('change', function () {
      console.log("Code changed");
      // Future: Broadcast code changes to other connected users in real-time
    });
  });
  
