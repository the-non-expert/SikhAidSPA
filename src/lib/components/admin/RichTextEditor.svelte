<script lang="ts">
	/**
	 * RichTextEditor Component
	 * TipTap-powered WYSIWYG editor for blog and campaign content
	 */

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import Image from '@tiptap/extension-image';
	import Icon from '@iconify/svelte';

	let { content = $bindable(''), label = 'Content', placeholder = 'Start writing...' } = $props();

	let editor: Editor;
	let element: HTMLElement;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'text-blue-600 underline'
					}
				}),
				Image.configure({
					HTMLAttributes: {
						class: 'max-w-full h-auto rounded-lg'
					}
				})
			],
			content: content,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4'
				}
			},
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	// Toolbar actions
	function toggleBold() {
		editor?.chain().focus().toggleBold().run();
	}

	function toggleItalic() {
		editor?.chain().focus().toggleItalic().run();
	}

	function toggleStrike() {
		editor?.chain().focus().toggleStrike().run();
	}

	function toggleBulletList() {
		editor?.chain().focus().toggleBulletList().run();
	}

	function toggleOrderedList() {
		editor?.chain().focus().toggleOrderedList().run();
	}

	function toggleBlockquote() {
		editor?.chain().focus().toggleBlockquote().run();
	}

	function setHeading(level: 1 | 2 | 3) {
		editor?.chain().focus().toggleHeading({ level }).run();
	}

	function addLink() {
		const url = prompt('Enter URL:');
		if (url) {
			editor?.chain().focus().setLink({ href: url }).run();
		}
	}

	function removeLink() {
		editor?.chain().focus().unsetLink().run();
	}

	function addImage() {
		const url = prompt('Enter image URL:');
		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	}

	function undo() {
		editor?.chain().focus().undo().run();
	}

	function redo() {
		editor?.chain().focus().redo().run();
	}

	// Check if command is active
	function isActive(name: string, attrs = {}) {
		return editor?.isActive(name, attrs) ?? false;
	}
</script>

<div class="rich-text-editor">
	<label class="block text-sm font-medium text-gray-700 mb-2">{label}</label>

	<!-- Toolbar -->
	<div class="toolbar border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
		<!-- Text Formatting -->
		<div class="flex gap-1 border-r border-gray-300 pr-2">
			<button
				type="button"
				onclick={toggleBold}
				class="toolbar-btn {isActive('bold') ? 'active' : ''}"
				title="Bold"
			>
				<Icon icon="mdi:format-bold" width="18" />
			</button>
			<button
				type="button"
				onclick={toggleItalic}
				class="toolbar-btn {isActive('italic') ? 'active' : ''}"
				title="Italic"
			>
				<Icon icon="mdi:format-italic" width="18" />
			</button>
			<button
				type="button"
				onclick={toggleStrike}
				class="toolbar-btn {isActive('strike') ? 'active' : ''}"
				title="Strikethrough"
			>
				<Icon icon="mdi:format-strikethrough" width="18" />
			</button>
		</div>

		<!-- Headings -->
		<div class="flex gap-1 border-r border-gray-300 pr-2">
			<button
				type="button"
				onclick={() => setHeading(1)}
				class="toolbar-btn {isActive('heading', { level: 1 }) ? 'active' : ''}"
				title="Heading 1"
			>
				<span class="font-bold">H1</span>
			</button>
			<button
				type="button"
				onclick={() => setHeading(2)}
				class="toolbar-btn {isActive('heading', { level: 2 }) ? 'active' : ''}"
				title="Heading 2"
			>
				<span class="font-bold">H2</span>
			</button>
			<button
				type="button"
				onclick={() => setHeading(3)}
				class="toolbar-btn {isActive('heading', { level: 3 }) ? 'active' : ''}"
				title="Heading 3"
			>
				<span class="font-bold">H3</span>
			</button>
		</div>

		<!-- Lists -->
		<div class="flex gap-1 border-r border-gray-300 pr-2">
			<button
				type="button"
				onclick={toggleBulletList}
				class="toolbar-btn {isActive('bulletList') ? 'active' : ''}"
				title="Bullet List"
			>
				<Icon icon="mdi:format-list-bulleted" width="18" />
			</button>
			<button
				type="button"
				onclick={toggleOrderedList}
				class="toolbar-btn {isActive('orderedList') ? 'active' : ''}"
				title="Numbered List"
			>
				<Icon icon="mdi:format-list-numbered" width="18" />
			</button>
			<button
				type="button"
				onclick={toggleBlockquote}
				class="toolbar-btn {isActive('blockquote') ? 'active' : ''}"
				title="Blockquote"
			>
				<Icon icon="mdi:format-quote-close" width="18" />
			</button>
		</div>

		<!-- Links & Images -->
		<div class="flex gap-1 border-r border-gray-300 pr-2">
			<button
				type="button"
				onclick={addLink}
				class="toolbar-btn {isActive('link') ? 'active' : ''}"
				title="Add Link"
			>
				<Icon icon="mdi:link" width="18" />
			</button>
			{#if isActive('link')}
				<button type="button" onclick={removeLink} class="toolbar-btn" title="Remove Link">
					<Icon icon="mdi:link-off" width="18" />
				</button>
			{/if}
			<button type="button" onclick={addImage} class="toolbar-btn" title="Add Image">
				<Icon icon="mdi:image" width="18" />
			</button>
		</div>

		<!-- Undo/Redo -->
		<div class="flex gap-1">
			<button type="button" onclick={undo} class="toolbar-btn" title="Undo">
				<Icon icon="mdi:undo" width="18" />
			</button>
			<button type="button" onclick={redo} class="toolbar-btn" title="Redo">
				<Icon icon="mdi:redo" width="18" />
			</button>
		</div>
	</div>

	<!-- Editor -->
	<div
		bind:this={element}
		class="editor-content border border-t-0 border-gray-300 rounded-b-lg bg-white"
	></div>
</div>

<style>
	:global(.rich-text-editor) {
		--navy: #1a237e;
	}

	.toolbar-btn {
		padding: 0.375rem 0.5rem;
		border-radius: 0.375rem;
		background-color: white;
		border: 1px solid #e5e7eb;
		color: #374151;
		transition:
			background-color 0.2s,
			border-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
	}

	.toolbar-btn:hover {
		background-color: #f3f4f6;
		border-color: #d1d5db;
	}

	.toolbar-btn.active {
		background-color: var(--navy);
		color: white;
		border-color: var(--navy);
	}

	:global(.editor-content .ProseMirror) {
		min-height: 300px;
		padding: 1rem;
	}

	:global(.editor-content .ProseMirror:focus) {
		outline: none;
	}

	:global(.editor-content .ProseMirror p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: #9ca3af;
		pointer-events: none;
		height: 0;
	}

	/* Prose styling */
	:global(.editor-content .ProseMirror h1) {
		font-size: 2em;
		font-weight: bold;
		margin-top: 0.67em;
		margin-bottom: 0.67em;
	}

	:global(.editor-content .ProseMirror h2) {
		font-size: 1.5em;
		font-weight: bold;
		margin-top: 0.83em;
		margin-bottom: 0.83em;
	}

	:global(.editor-content .ProseMirror h3) {
		font-size: 1.17em;
		font-weight: bold;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	:global(.editor-content .ProseMirror ul),
	:global(.editor-content .ProseMirror ol) {
		padding-left: 2rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.editor-content .ProseMirror blockquote) {
		border-left: 4px solid var(--navy);
		padding-left: 1rem;
		margin-left: 0;
		font-style: italic;
		color: #6b7280;
	}

	:global(.editor-content .ProseMirror img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin: 1rem 0;
	}

	:global(.editor-content .ProseMirror a) {
		color: #2563eb;
		text-decoration: underline;
	}
</style>
