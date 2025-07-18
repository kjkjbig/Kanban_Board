<template>
  <div class="h-160 bg-gray-400 rounded-2xl shadow-md">
    <!--ปุ่ม Add new Task-->
    <Button
      label="+ Add new Task"
      :onClick="addTask"
      Class="py-2 px-2 ml-3 mt-3 text-lg font-bold tracking-tight 
    text-white rounded-lg bg-blue-500 shadow-md hover:bg-blue-700 cursor-pointer "
    />
    <!--ปุ่ม Delete Column-->
    <Button
      label="Delete Column"
      :onClick="DlColumn"
      Class="py-2 px-2 ml-3 mt-3 text-lg font-bold tracking-tight 
    text-white rounded-lg bg-red-400 shadow-md hover:bg-red-700 cursor-pointer"
    />
    
    <!--Column name-->
    <input type="text" class="mx-5 text-2xl w-6/7 mt-2 focus:outline-none" placeholder=" Column name " maxlength="25">

    <!--draggable ครอบ Task-->
    <draggableComponent
      :list="props.tasks"
      item-key="id"
      :handle="'.drag-handle'"
    >
      <template #item="{ element }">
        <Task :taskId="element.id" @delete-task="deleteTask" />
      </template>
    </draggableComponent>
    
  </div>
</template>

<script setup lang="ts">

  import Button from '../Models/Button.vue';
  import Task from './Task.vue';
  import { defineEmits, ref } from 'vue'
  import draggableComponent from 'vuedraggable';

  type TaskData = { // ข้อมูล task
    id: number
  } 

  const props = defineProps<{ // รับ id จาก board
    columnId: number,
    tasks: TaskData[]; //ดึง TaskData มา
  }>()

  const emit = defineEmits<{ // รับ emit และข้อมูลต่างๆ เช่น id จาก function และส่งไปหา Board
    (e: 'delete-column', id: number): void;
    (e: 'delete-task', columnId: number, taskId: number): void;
    (e: 'add-task', columnId: number): void;
  }>()
  
  // -------------------------------------------------------------------- ส่วน function ส่ง emit และ props ไปหา defineEmits
  const DlColumn = () => emit('delete-column', props.columnId) // ส่ง columnid ให้ emit ลบ column นั้นๆ
  const addTask = () => emit('add-task', props.columnId) // ส่ง columnid ให้ emit เพิ่ม task ใน column นั้นๆ
  const deleteTask = (taskId: number) => emit('delete-task', props.columnId, taskId) // รับ taskid และส่ง taskid , column ต่อให้ emit เพื่อระบุตัวตนว่า column,task ไหน
  // --------------------------------------------------------------------

</script>

<style>

</style>