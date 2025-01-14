<template>
  <template v-if="editor">
    <div class="w-full flex flex-col gap-4">
      <div
        class="grid grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-2"
      >
        <!-- FORMATTERS -->
        
        <!-- Bold -->
        <EditorOptionsButton
          tooltip="Bold"
          :disabled-binding="!editor.can().chain().focus().toggleBold().run()"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('bold') }"
          icon="i-material-symbols-format-bold-rounded"
          @click="editor.chain().focus().toggleBold().run()"
        />
        
        <!-- Italic -->
        <EditorOptionsButton
          tooltip="Italic"
          :disabled-binding="!editor.can().chain().focus().toggleItalic().run()"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('italic') }"
          icon="i-material-symbols-format-italic-rounded"
          @click="editor.chain().focus().toggleItalic().run()"
        />
        
        <!-- Strikethrough -->
        <EditorOptionsButton
          tooltip="Strikethrough"
          :disabled-binding="!editor.can().chain().focus().toggleStrike().run()"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('strike') }"
          icon="i-material-symbols-format-strikethrough-rounded"
          @click="editor.chain().focus().toggleStrike().run()"
        />
        
        <!-- Code -->
        <EditorOptionsButton
          tooltip="Code"
          :disabled-binding="!editor.can().chain().focus().toggleCode().run()"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('code') }"
          icon="i-material-symbols-code"
          @click="editor.chain().focus().toggleCode().run()"
        />
        
        <!-- Clear Marks -->
        <EditorOptionsButton
          tooltip="Clear Marks"
          icon="i-material-symbols-format-clear-rounded"
          @click="editor.chain().focus().unsetAllMarks().run()"
        />
        
        <!-- Clear Nodes -->
        <EditorOptionsButton
          tooltip="Clear Nodes"
          icon="i-material-symbols-layers-clear-rounded"
          @click="editor.chain().focus().clearNodes().run()"
        />
        <EditorOptionsButton
          tooltip="Paragraph"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('paragraph') }"
          icon="i-material-symbols-format-paragraph"
          @click="editor.chain().focus().setParagraph().run()"
        />
        
        <!-- Headings Dropdown -->
        <UDropdown
          :ui="{
            width: 'w-max',
            base: 'flex items-center',
            height: 'h-[2rem]',
            divide: 'divide-x-2 divide-y-0',
            padding: 'p-0',
            background: 'dark:bg-black',
            item: { padding: 'px-0 py-0 ' },
          }"
          :popper="{ arrow: true, placement: 'right-start' }"
          :items="[
            [{ slot: 'h1', label: '' }],
            [{ slot: 'h2', label: '' }],
            [{ slot: 'h3', label: '' }],
            [{ slot: 'h4', label: '' }],
            [{ slot: 'h5', label: '' }],
            [{ slot: 'h6', label: '' }],
          ]"
        >
          <EditorOptionsButton
            tooltip="Heading"
            :class-binding="{
              'dark:bg-gray-700/50': editor.isActive('heading'),
            }"
            icon="i-material-symbols-h-mobiledata-rounded"
          />
          <template #h1>
            <EditorOptionsButton
              tooltip="Heading 1"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 1 }),
              }"
              icon="i-material-symbols-format-h1-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            />
          </template>
          <template #h2>
            <EditorOptionsButton
              tooltip="Heading 2"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 2 }),
              }"
              icon="i-material-symbols-format-h2-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            />
          </template>
          <template #h3>
            <EditorOptionsButton
              tooltip="Heading 3"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 3 }),
              }"
              icon="i-material-symbols-format-h3-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            />
          </template>
          <template #h4>
            <EditorOptionsButton
              tooltip="Heading 4"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 4 }),
              }"
              icon="i-material-symbols-format-h4-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            />
          </template>
          <template #h5>
            <EditorOptionsButton
              tooltip="Heading 5"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 5 }),
              }"
              icon="i-material-symbols-format-h5-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            />
          </template>
          <template #h6>
            <EditorOptionsButton
              tooltip="Heading 6"
              :class-binding="{
                'dark:bg-gray-700/50': editor.isActive('heading', { level: 6 }),
              }"
              icon="i-material-symbols-format-h6-rounded"
              @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            />
          </template>
        </UDropdown>
        
        <!-- LISTS -->
        
        <!-- Bullet List -->
        <EditorOptionsButton
          tooltip="Bullet List"
          icon="i-material-symbols-format-list-bulleted-rounded"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
        
        <!-- Ordered List -->
        <EditorOptionsButton
          tooltip="Ordered List"
          icon="i-material-symbols-format-list-numbered-rounded"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
        
        <!-- Code Block -->
        <EditorOptionsButton
          tooltip="Code Block"
          icon="i-material-symbols-code-blocks-rounded"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('codeBlock') }"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        />
        
        <!-- Blockquote -->
        <EditorOptionsButton
          tooltip="Blockquote"
          icon="i-material-symbols-format-quote-rounded"
          :class-binding="{ 'dark:bg-gray-700/50': editor.isActive('blockquote') }"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />
        
        <!-- Horizontal Rule -->
        <EditorOptionsButton
          tooltip="Horizontal Rule"
          icon="i-material-symbols-horizontal-rule-rounded"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
        
        <!-- Hard Break -->
        <EditorOptionsButton
          tooltip="Hard Break"
          icon="i-material-symbols-format-line-spacing-rounded"
          @click="editor.chain().focus().setHardBreak().run()"
        />
        
        <!-- Highlight -->
        <EditorOptionsButton
          tooltip="Highlight"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive('highlight'),
          }"
          icon="i-material-symbols-highlighter-size-5"
          @click="editor.chain().focus().toggleHighlight().run()"
        />
        
        <!-- Underline -->
        <EditorOptionsButton
          tooltip="Underline"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive('underline'),
          }"
          icon="i-material-symbols-format-underlined-rounded"
          @click="editor.chain().focus().toggleUnderline().run()"
        />
        
        <!-- HISTORY / MEMORY -->
        
        <!-- Undo -->
        <EditorOptionsButton
          tooltip="Undo"
          icon="i-material-symbols-undo-rounded"
          :disabled-binding="!editor.can().chain().focus().undo().run()"
          @click="editor.chain().focus().undo().run()"
        />
        
        <!-- Redo -->
        <EditorOptionsButton
          tooltip="Redo"
          icon="i-material-symbols-redo-rounded"
          :disabled-binding="!editor.can().chain().focus().redo().run()"
          @click="editor.chain().focus().redo().run()"
        />
        
        <!-- ALIGNMENT -->
        
        <!-- Align Left -->
        <EditorOptionsButton
          tooltip="Text Align Left"
          icon="i-material-symbols-format-align-left-rounded"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive({ textAlign: 'left' }),
          }"
          @click="editor.chain().focus().setTextAlign('left').run()"
        />
        
        <!-- Align Center -->
        <EditorOptionsButton
          tooltip="Text Align Center"
          icon="i-material-symbols-format-align-center-rounded"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive({ textAlign: 'center' }),
          }"
          @click="editor.chain().focus().setTextAlign('center').run()"
        />
        
        <!-- Align Right -->
        <EditorOptionsButton
          tooltip="Text Align Right"
          icon="i-material-symbols-format-align-right-rounded"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive({ textAlign: 'right' }),
          }"
          @click="editor.chain().focus().setTextAlign('right').run()"
        />
        
        <EditorOptionsButton
          tooltip="Text Align Justify"
          icon="i-material-symbols-format-align-justify-rounded"
          :class-binding="{
            'dark:bg-gray-700/50': editor.isActive({ textAlign: 'justify' }),
          }"
          @click="editor.chain().focus().setTextAlign('justify').run()"
        />
      </div>
      
      <!-- Editor Textarea -->
      <EditorContent :editor="editor" class="prose max-w-none" />
      
      <!-- Word and Character Counter -->
      <UProgress
        :value="percentage"
        size="sm"
        :color="percentage >= 50 && percentage <75 ? 'orange' : percentage >= 75 ? 'rose' : 'indigo'"
        :ui="{
          wrapper: 'w-[12.5rem] self-end',
        }"
      >
        <template #indicator>
          <div class="flex flex-col text-right text-sm">
            <span>{{ editor?.storage.characterCount.characters() }} / {{ limit }} characters</span>
            <small class="text-gray">
              {{ editor?.storage.characterCount.words() }} words
            </small>
          </div>
        </template>
      </UProgress>
      <LazyUDivider />
      <div class="tiptap dark:bg-slate-900" v-if="editor" v-html="editor.getHTML()" />
      <pre v-if="editor">{{ editor.getHTML() }}</pre>
    </div>
  </template>
  
  <template v-else>
    <p>LOADING EDITOR...</p>
  </template>
</template>

<script setup lang="ts">
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import {
  EditorContent,
  useEditor
} from '@tiptap/vue-3'
import {
  all,
  createLowlight
} from 'lowlight'

const lowlight = createLowlight(all)
const limit = ref(10000) // Character limit (Edit to preference or remove) if removed also remove the limit configuration on the CharacterCount extension

const editor = useEditor({
  content: '<h2>\n' +
    '      Hi there,\n' +
    '    </h2>\n' +
    '    <p>\n' +
    '      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:\n' +
    '    </p>\n' +
    '    <ul>\n' +
    '      <li>\n' +
    '        That’s a bullet list with one …\n' +
    '      </li>\n' +
    '      <li>\n' +
    '        … or two list items.\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '    <p>\n' +
    '      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:\n' +
    '    </p>\n' +
    '<pre><code class="language-css">body {\n' +
    '  display: none;\n' +
    '}</code></pre>\n' +
    '    <p>\n' +
    '      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.\n' +
    '    </p>\n' +
    '    <blockquote>\n' +
    '      Wow, that’s amazing. Good work, boy! 👏\n' +
    '      <br />\n' +
    '      — Mom\n' +
    '    </blockquote>',
  // content: '<h2 style="text-align:center">Hello Nuxt!</h2> <br> <p style="text-align:center">Click on the footer <strong>github</strong> icon for more info and docs.</p> ',
  editorProps: {
    // attributes: {
    //   class: 'dark:bg-slate-900 dark:text-slate-200',
    // },
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    },
  },
  extensions: [
    Underline,
    Highlight,
    CharacterCount.configure({
      limit: limit.value,
    }),
    Link.configure({
      defaultProtocol: 'https',
      protocols: ['https', 'mailto', 'tel', 'http', 'ftp'],
      HTMLAttributes: {
        target: '_blank',
      },
    }),
    StarterKit.configure({
      codeBlock: false, // Disabled to accommodate CodeBlockLowlight which allows syntax highlighting for codes
    }),
    Image.configure({ allowBase64: true }),
    CodeBlockLowlight.configure({ lowlight }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
})

const percentage = computed(() => {
  return Math.round((100 / limit.value) * editor.value?.storage.characterCount.characters())
})

// Clears the value of the on Unmount
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
