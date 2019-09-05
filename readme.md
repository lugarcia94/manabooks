# Taitamariki Tray

## Comece agora
```shell
## Clonando o Projeto
git clone -b [branch] --single-branch git@git.auaha.com.br:tray/taita-tray.git [project] 

## Entrando na pasta do Projeto
cd [project]

## Instalando dependências
npm install or npm i

## Começando seu projeto
npm start
```

## Guia
* [Estrutura](#estrutura)
* [Variáveis](#variá veis)
* [npm run](#npm)

## Estrutura
```
├── src
│   ├── core              (Base dos projetos Configurações e funções Globais)
│   │  ├── config         (Arquivos CSS e JS de configurações Basicas)
│   │  │   ├── index.js   (Arquivo de Chamada)
│   │  │   ├── reset.styl (CSS base que reseta a strutura)
│   │  ├── plugins        (Pasta onde se localiza os plugins globais)
|   |  ├── variables.styl (Variaveis/Placeholder/Mixins globais)
|   |  ├── index.js       (Arquivo de Chamada)
|   ├── snippets          (Componente CSS e JS)
|   ├── react             (Componentes em ReactJS)
├── package.json          (Declaração de informações e pacote de depências NODE.js & NPM)
├── webpack.config.js     (Gerenciador de Componentes)
├── opencode              (Arquivos HTML do Projeto)
```

## Variáveis
### Cores
* color-primary: [color]
* color-secundary: [color]

### Fonts
* font-primary: [font]

### Obs.:

```stylus
# Código das font primary é chamada dentro do arquivo 'reset.sty'
html
    font-family    : font-primary
```

### SVG
No projeto existe um plugin para svg:
- [iconfont-webpack-plugin](https://github.com/jantimon/iconfont-webpack-plugin)
- [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)


#### Exemplo (iconfont-webpack-plugin):
```stylus
# Entrada
.mycart 
  &:before 
    font-icon: url('./svg/cart.svg')
```
```css
# Saida
@font-face {
  font-family: i96002e;
  src: url("data:application/x-font-woff;charset=utf-8;base64        d09GRgABAAAAA.....IdAA==") format('woff');
}
.mycart:before {
  font-family: i96002e;
  content: '\E000';
}
```
### Obs.: 
Isso gera uma Fonte do SVG onde você pode mudar a cor com a propriedade 'color' e tamanho com 'font-size'.

#### Exemplo (postcss-inline-svg)
```stylus
# Entrada
.mycart 
  &:before 
    background: svg-load('img/arrow-up.svg', fill=#000, stroke=#fff);
```
```css
# Saida
.mycart:before {
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg fill='%23000' stroke='%23fff'%3E...%3C/svg%3E");
}
```

### Obs.: 
Isso gera uma base64


### Pré-processadores
O Projeto utiliza Webpack para compilar o projeto, junto com varios outros plugins como:
* postcss
* postcss-object-fit-images
* postcss-inline-svg
* postcss-svgo
* autoprefixer
* stylus

## NPM
Para utilizar as funções do projetos utilizamos o script do npm.

Comandos disponíveis:

* npm start (Modo Developer)
* npm run deploy (Após finalizado - para subir o projeto)