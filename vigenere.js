function vigenereCipher(text, key) {
    this.text = text;
    this.key = key;
    Object.defineProperty(this, 'text', {
        get: function() {
            //console.log("Text retrieved.");
            return text;
        },
        set: function(value) {
            text = value;
            console.log("Text set. Text = " + text);
        }
    });
    Object.defineProperty(this, 'key', {
        get: function() {
            return key;
        },
        set: function(value) {
            key = value;
            console.log("Key set. Key = " + key);
        }
    });
    this.encrypt = function() {
        var text_length = text.length;
        var key_length = key.length;
        if (text_length > 0 && key_length > 0) {
            // make key have same length as text
            var keyConst = key;
            while (text_length !== key_length) {
                if (text_length > key_length) {
                    // lengthen the key
                    key += keyConst;
                } else if (text_length < key_length) {
                    // shorten the key (is this really necessary?)
                    var difference = key_length - text_length;
                    key = key.substring(0, key_length - difference);
                }
                key_length = key.length;
            }
            console.log(text);
            console.log(key);
            console.log(text_length);
            var result = "";
            // go through each A-z character in the text, skipping anything else
            var abs = text_length;
            for (var i = 0; i < abs; i++) {
                // for the current character index, get the key value at that index
                // get the UTF code of the current key character
                var code = key.charCodeAt(i);
                if (code >= 97 && code <= 122) {
                    code = code - 97;
                } else if (code >= 65 && code <= 90) {
                    code = code - 65;
                }
                const caesar = new caesarCipher(text.charAt(i), code);
                var encoded = caesar.encrypt();
                result += encoded;
            }
            return result;
            // clean that code up so that it fits with the 0-25 model
            // use the current text character as the text and the cleaned code as the offset for a Caesar cipher
            // add returned cipher to the result string
            // return result string
        } else {
            console.log("Text or key or both are not set.");
            return false;
        }
    }
}