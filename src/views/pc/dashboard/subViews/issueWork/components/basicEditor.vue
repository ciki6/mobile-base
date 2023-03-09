<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      :mode="mode"
      v-model="valueHtml"
      style="height: 300px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>

<script lang="ts" setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineProps,
  defineEmits,
  watch,
  computed,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import { DomEditor } from "@wangeditor/editor";

const props = defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);

const mode = "default";
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const toolbarConfig = {
  excludeKeys: ["group-video", "codeBlock"],
};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: any) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor: any) => {
  // emit("update:modelValue", editor.getHtml());
  // console.log("change:", editor.getHtml(), "======", valueHtml.value);
};
const handleDestroyed = (editor: any) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor: any) => {
  console.log("focus", editor);
};
const handleBlur = (editor: any) => {
  console.log("blur", editor);
};
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor: any, event: any, callback: any) => {
  console.log("ClipboardEvent 粘贴事件对象", event);

  // 自定义插入内容
  editor.insertText("xxx");

  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(false); // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
};

const insertText = () => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.insertText("hello world");
};

const printHtml = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};

const disable = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.disable();
};
</script>
