import {StyleSheet} from 'react-native';

import Colors from '~/config/Colors';

const globalStyles = StyleSheet.create({
  alinhado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeTitle: {
    fontSize: 34,
  },
  title1: {
    fontSize: 28,
  },
  title2: {
    fontSize: 22,
  },
  title3: {
    fontSize: 20,
  },
  headline: {
    // Titulo
    fontSize: 17,
    fontWeight: '500',
  },
  body: {
    // Corpo do Texto
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '300',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callout: {
    // Legendas ilustrativa associadas à imagens
    fontSize: 16,
  },
  subhead: {
    // Subtitulo
    fontSize: 15,
  },
  footnote: {
    // texto de rodapé
    fontSize: 13,
  },
  caption1: {
    // legenda
    fontSize: 12,
  },
  caption2: {
    // legenda menor
    fontSize: 11,
  },

  header: {
    padding: 10,
    backgroundColor: Colors.secColor,
    borderBottomWidth: 3,
    borderColor: Colors.priColor,
  },
  secHeader: {
    padding: 0,
    backgroundColor: Colors.secColor,
    borderBottomWidth: 6,
    borderColor: Colors.priColor,
  },
  headerText: {
    color: Colors.white,
    fontSize: 15,
    textAlign: 'center',
    // fontStyle: 'italic'
  },
  fab: {
    position: 'absolute',
    backgroundColor: Colors.priColor,
    margin: 0,
    right: 20,
    bottom: 20,
  },
  button: {
    height: 48,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: Colors.mainColor1,
    borderColor: Colors.mainColor4,
    borderWidth: 4,
    borderRadius: 7,
  },
  ctaButton: {
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20%',
    marginRight: '20%',
    margin: 15,
    backgroundColor: Colors.mainColor1,
    borderColor: Colors.mainColor4,
    borderWidth: 4,
    borderRadius: 7,
  },
  textMessage: {
    color: Colors.errorBackground,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default globalStyles;
