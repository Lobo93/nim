let moedas = Array.from(document.querySelectorAll('.moeda'))
let moedasEmJogo = []
let moedasJogador = 0
let moedasNim = 0
let jogadasJogador = 3
let jogadasNim = 3
let vezDoJogador = true
let fimDeJogo = false

moedas.forEach((moeda,indice) => moeda.style.setProperty('--posicao', indice))

// Novo jogo
function novoJogo() {
	moedasEmJogo.reverse()
	moedasEmJogo.forEach((moeda,indice) => {
		setTimeout(() => {
			moeda.parentElement.appendChild(moeda)
			moeda.clientTop
			moeda.classList.remove('moeda-jogador', 'moeda-nim')
			moeda.style.setProperty('--posicao', moedas.length)
			moedas.push(moeda)
		}, 50 * indice)
	})
	moedasEmJogo = []
	moedasJogador = 0
	jogadasJogador = 3
	moedasNim = 0
	setTimeout(() => {
		botao.textContent = 'Passar a vez'
		vezDoJogador = true
		mostrarMensagem('Sua vez')
	}, 1200)
}


// Mensagens
function mostrarMensagem(texto) {
	mensagem.classList.remove('animada')
	mensagem.clientTop
	mensagem.classList.add('animada')
	mensagem.textContent = texto
}

// Vez do jogador
moedas.forEach(moeda => moeda.addEventListener('click', pegarMoeda))

function rodadaJogador() {
	mostrarMensagem('Sua vez')
	vezDoJogador = true
	jogadasJogador = 3
}

function pegarMoeda({target}) {
	if (!vezDoJogador) return
	if (moedasEmJogo.includes(target)) return
	if (jogadasJogador <= 0) {
		mostrarMensagem('Você já pegou três moedas')
		return
	}
	const moeda = moedas.pop()
	moedasEmJogo.push(moeda)
	moeda.parentElement.appendChild(moeda)
	moeda.clientTop
	moeda.classList.add('moeda-jogador')
	moeda.style.setProperty('--posicao', moedasJogador)
	jogadasJogador--
	moedasJogador++
	if (moedas.length === 0) {
		mostrarMensagem('Você venceu!')
		botao.textContent = 'Jogar de novo?'
		fimDeJogo = true
	}
}

// Botao
botao.addEventListener('click', () => {
	if (fimDeJogo) {
		fimDeJogo = false
		setTimeout(novoJogo, 200)
		return
	}
	if (!vezDoJogador) return
	if (jogadasJogador >= 3) {
		mostrarMensagem('Você deve pegar pelo menos uma moeda')
		return
	}
	vezDoJogador = false
	rodadaNim()
})

// Vez do Nim
function rodadaNim() {
	mostrarMensagem('Vez do Nim')
	jogadasNim = (moedas.length % 4)
	if (jogadasNim === 0) jogadasNim = Math.random() * 3 + 1
	setTimeout(nimPegaMoeda, 1000)
}

function nimPegaMoeda() {
	const moeda = moedas.pop()
	moedasEmJogo.push(moeda)
	moeda.parentElement.appendChild(moeda)
	moeda.clientTop
	moeda.classList.add('moeda-nim')
	moeda.style.setProperty('--posicao', moedasNim)
	jogadasNim--
	moedasNim++
	if (moedas.length === 0) {
		setTimeout(() => {
			mostrarMensagem('Nim venceu!')
			botao.textContent = 'Jogar de novo?'
			fimDeJogo = true
		}, 400);
		return
	}
	if (jogadasNim > 0) {
		setTimeout(nimPegaMoeda, 400)
		return
	}
	setTimeout(() => {
		rodadaJogador()
		botao.classList.add('active')
	}, 600)
	setTimeout(() => {
		botao.classList.remove('active')
	}, 800)
}
