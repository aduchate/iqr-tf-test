import { html, LitElement, property } from 'lit-element';
import {EditorState} from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema } from 'prosemirror-model'
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap, toggleMark } from "prosemirror-commands";
import {schema} from './schema'
import MarkdownIt from 'markdown-it'
import {MarkdownParser} from 'prosemirror-markdown'
import {iqrTextFieldStyle} from "./style";
// @ts-ignore
import { caretFixPlugin } from './caret-fix-plugin'

class IqrTextField extends LitElement {
	@property() value: string = '';
	private readonly schema: Schema;
	private readonly markdownParser: MarkdownParser<Schema<"paragraph" | "doc" |  "text", "strong" | "em" >>;

	private placeHolder?: HTMLElement;

	constructor() {
		super();
		this.schema = schema()
		this.markdownParser = new MarkdownParser(this.schema, MarkdownIt("commonmark", {html: false}), {
			paragraph: {block: "paragraph"},
			em: {mark: "em"},
			strong: {mark: "strong"}
		})
	}

	static get styles() {
		return [ iqrTextFieldStyle ];
	}

	render() {
		return html`<div class="iqr-form"><div id="editor"></div></div>`;
	}

	firstUpdated() {
		this.placeHolder = this.shadowRoot?.getElementById('editor') || undefined
		if (this.placeHolder) {
			new EditorView(this.placeHolder, {
				state: EditorState.create({
					doc: this.markdownParser.parse(this.value),
					schema: this.schema,
					plugins: [
						//caretFixPlugin(), /* Uncomment to fix the bug under Firefox */
						history(),
						keymap({"Mod-z": undo, "Mod-Shift-z": redo}),
						keymap({
							"Mod-b": toggleMark(this.schema.marks.strong),
							"Mod-i": toggleMark(this.schema.marks.em)
						}),
						keymap(baseKeymap)
					]
				})
			})
		}
	}
}
customElements.define('iqr-text-field', IqrTextField);
