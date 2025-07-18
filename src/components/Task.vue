<template>
  <div class="grid-cols-1 gap-2"> <!--Task-->
      <div class="flex bg-white h-20 rounded-2xl shadow-md mx-2 my-2 items-center justify-center">
        <!--ส่วนคลิกลากเปลี่ยนตำแหน่ง-->
        <div
          class="bg-yellow-400 mt-0 h-full w-5 rounded-l-md hover:cursor-grab drag-handle"
          title="Drag to move"
        >
        </div>
        <div class=" w-full mx-5">
          <input type="text" placeholder="Task name" class="w-full font-bold text-xl text-gray-700 focus:outline-none" maxlength="20"> <!--Task name-->
          <p class="my-2"></p>
          <input type="text" placeholder="Task detail" class="w-full text-gray-800 focus:outline-none" maxlength="30"> <!--Task detail-->
        </div>
        <div class="bg-red-400 mt-0 h-full rounded-r-md">
          <!--ปุ่มลบ task-->
            <Button
              label="x"
              class="w-5 text-center items-center mt-5.5 hover:cursor-pointer text-white font-bold"
              @click="DlTask"
            />
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '../Models/Button.vue';

    const props = defineProps<{ // รับ id จาก column
      taskId: number
    }>()

    const emit = defineEmits<{ // รับ emit delete-task จาก DlTask แล้วส่งให้ column
      (e: "delete-task", taskId: number): void;
    }>()

    const DlTask = () => { // รับ emite จากปุ่ม delete task
      emit("delete-task", props.taskId)
    }
</script>

<style>

</style>