const fs = require( 'fs' ).promises;
const util = require( 'util' );

const sass = require( 'sass' );
const postcss = require( 'postcss' );
const autoprefixer = require( 'autoprefixer' );
const { transform } = require( 'esbuild' );

build().catch( error => {
  console.error( error );
  process.exit( 1 );
} );

async function build() {
  const render = util.promisify( sass.render );

  const sassResult = await render( {
    file: __dirname + '/src/framework.scss',
    includePaths: [
      __dirname + '/node_modules/modern-normalize',
    ],
  } );

  const processor = postcss( [ autoprefixer ] );

  const postcssResult = await processor.process( sassResult.css, {
      from: __dirname + '/src/framework.scss',
      to: __dirname + '/dist/framework.min.css',
  } );

  const transformResult = await transform( postcssResult.css, {
    loader: 'css',
    minify: true,
  } );

  await fs.mkdir( __dirname + '/dist', { recursive: true } );

  await fs.writeFile( __dirname + '/dist/framework.min.css', transformResult.code );
}
