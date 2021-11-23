import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskTitle = tasks.filter(task => task.title === newTaskTitle);
    if (taskTitle.length > 0) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.');
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldStates => [...oldStates, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          style: 'cancel',
          text: 'Não'
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const deleteTask = tasks.filter(task => task.id !== id);
            setTasks(deleteTask);
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})