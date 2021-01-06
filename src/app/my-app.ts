import {css, html, LitElement} from 'lit-element';

import './components/iqr-text-field';

class MyApp extends LitElement {
	static get styles() {
		return css`
			iqr-text-field {
				display: block;
				margin-top:24px;
				margin-bottom:24px;
			}
		`;
	}

	render() {
        return html`
					<div>Change focus from one textfield to the next using the mouse to trigger bug, uncomment plugin caret-fix-plugin in iqr-text-field/index.ts to fix.</div>
<iqr-text-field style="width: 320px" value="*Hello* **world**" class="f1"></iqr-text-field>
<iqr-text-field style="width: 320px" value="*Bye* **world**" class="f2"></iqr-text-field>
`;
    }
}
customElements.define('my-app', MyApp);
