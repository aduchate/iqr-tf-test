import { Schema } from 'prosemirror-model';

export function schema() {
	return new Schema({
		nodes: {
			doc: {
				content: 'block+'
			},

			paragraph: {
				content: 'inline*',
				group: 'block',
				parseDOM: [{tag: 'p'}],
				toDOM() {
					return ['p', 0]
				}
			},

			text: {
				group: 'inline'
			}
		},

		marks: {
			em: {
				parseDOM: [{tag: 'i'}, {tag: 'em'},
					{style: 'font-style', getAttrs: value => value === 'italic' && null}],
				toDOM() {
					return ['em']
				}
			},

			strong: {
				parseDOM: [{tag: 'b'}, {tag: 'strong'},
					{style: 'font-weight', getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null}],
				toDOM() {
					return ['strong']
				}
			}
		}
	})
}
