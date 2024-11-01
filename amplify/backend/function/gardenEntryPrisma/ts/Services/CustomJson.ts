class CustomJson {
	// JSON.stringifyがBigIntに対応していないためカスタマイズ
  static stringify = (sourceObject) => {
  	return JSON.stringify(sourceObject, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
  	)
  }
}

export default CustomJson
