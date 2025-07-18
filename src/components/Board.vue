<template>
  <div class="flex-1 bg-gray-300 rounded-4xl mx-10 my-10">
    <div class="bg-white shadow-sm">
      <div class="flex mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8 justify-between ">

        <!--เปลี่ยนชื่อ board-->  
        <input class="text-3xl font-bold tracking-tight text-gray-900 focus:outline-none sm: w-1/2" placeholder="Board name" maxlength="23"/> 

        <!--ปุ่ม Add Column-->  
        <Button 
          label="+ Add new Column"
          :onClick="addColumn"
          Class="py-2 px-2 text-lg font-bold tracking-tight 
          text-white rounded-lg bg-gray-500 hover:bg-gray-700 cursor-pointer"
        />

      </div>
  </div>

  <!--ส่วนของ column-->
  <div class="">
    <div class="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      
      <Column
      v-for="col in board"
      :key="col.id"
      :columnId="col.id"
      :tasks="col.tasks"
      @add-task="addTask"
      @delete-task="deleteTask"
      @delete-column="deleteColumn"
    />
      
    </div>
  </div>
  </div>
</template>

<script setup lang="ts"> 

  import { onMounted, ref, watch } from 'vue';
  import Button from '../Models/Button.vue';
  import Column from './Column.vue';

  type TaskData = { id: number }
  type ColumnType = { id: number; tasks: TaskData[] }

  let columnId = 1
  let taskId = 1

  const board = ref<ColumnType[]>([]) // ref ดึง ColumnType

  // -------------------------------------------------------------------- ส่วน function
  const addColumn = () => { // เพิ่ม column
    board.value.push({ id: columnId++, tasks: [] }) // push ข้อมูล id column,task แล้ว ref รีโหลด <Column/> โดยวนลูป board จะทำให้เห็น column เพิ่มขึ้นมาบนหน้าจอ
  }

  const deleteColumn = (id: number) => {
    board.value = board.value.filter(col => col.id !== id) //ลบ board ด้วย filter โดยอิงจาก id ที่รับมา
  }

  const addTask = (columnId: number) => { // add task โดยรับ colunmId
    const column = board.value.find(col => col.id === columnId) // หาว่าเป็น column ไหนที่ส่งคำสั่งมา
    if (!column) return
    if (column.tasks.length >= 6) { // ตรวจสอบจำนวน task (ห้ามเกิน 6)
      alert('Cannot add more than 6 tasks in this column.')
      return
    }
    column.tasks.push({ id: taskId++ }) // add task ให้กับ column ที่ส่งคำสั่งมา
  }

  const deleteTask = (columnId: number, taskId: number) => { // ลบ task โดยรับ columnId , taskId
    const column = board.value.find(col => col.id === columnId) // หาว่าเป็น column ไหนที่ส่งคำสั่งมา
    if (!column) return
    column.tasks = column.tasks.filter(task => task.id !== taskId) // delete task ให้กับ column ที่ส่งคำสั่งมา
  }
  // --------------------------------------------------------------------

  // -------------------------------------------------------------------- ส่วนเซฟข้อมูล
  onMounted(() => {
    const savedBoard = localStorage.getItem("kanban-board");
    if (savedBoard) {
      board.value = JSON.parse(savedBoard);
    }
  });

  watch(board, (newBoard) => {
    localStorage.setItem("kanban-board", JSON.stringify(newBoard));
  }, { deep: true });
  // --------------------------------------------------------------------

</script>


<style>

</style>