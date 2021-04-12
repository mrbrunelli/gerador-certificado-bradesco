## Gerador de Certificado Fundação Bradesco
> Atenção: Essa aplicação foi criada com a finalidade de estudar mais sobre criação de PDFs com Node e Puppeteer, e não deve ser utilizada de forma indevida.

#### Como executar
Instale as dependências
```sh
npm install
```
Execute em modo produção
```sh
npm start
```

#### Importante
> É necessário ter as libs do Chromiun instalado no ambiente de produção. 

Para instalar no Heroku, utilize:
```sh
heroku buildpacks:add jontewks/puppeteer
```

Para mais informações: [puppeteer-heroku-buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack)

#### Screenshots
Formulário
![](.github/print1.png)

PDF do Certificado
![](.github/print2.png)