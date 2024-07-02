<template>
  <div>
    <table class="text-[12px]">
      <col v-for="row in keys" />
      <tr class="gap-2" v-for="col in keys">
        <td class="border gap-2 w-10 text-center p-[2px] transition duration-75" v-for="k in col" :key="k.key"
          :colspan="k.span" :data-keycode="k.keycode">
          {{
        k.key }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
function getElementByKeycode(keycode: number) {
  return document.querySelector(`[data-keycode="${keycode}"]`);
}

onMounted(() => {
  document.body.addEventListener('keydown', function (e) {
    let element = getElementByKeycode(e.keyCode)
    if (!element) {
      return console.warn('No key for', e.keyCode);
    }

    element.classList.add('bg-gray-600');
  });

  document.body.addEventListener('keyup', function (e) {
    let element = getElementByKeycode(e.keyCode)
    if (!element) {
      return console.warn('No key for', e.keyCode);
    }

    element.classList.remove('bg-gray-600');
  });
})

const keys = [
  [
    {
      "key": "Tab",
      "span": 1,
      "keycode": 9
    },
    {
      "key": "Q",
      "span": 1,
      "keycode": 81
    },
    {
      "key": "W",
      "span": 1,
      "keycode": 87
    },
    {
      "key": "E",
      "span": 1,
      "keycode": 69
    },
    {
      "key": "R",
      "span": 1,
      "keycode": 82
    },
    {
      "key": "T",
      "span": 1,
      "keycode": 84
    },
    {
      "key": "Y",
      "span": 1,
      "keycode": 89
    },
    {
      "key": "U",
      "span": 1,
      "keycode": 85
    },
    {
      "key": "I",
      "span": 1,
      "keycode": 73
    },
    {
      "key": "O",
      "span": 1,
      "keycode": 79
    },
    {
      "key": "P",
      "span": 1,
      "keycode": 80
    },
    {
      "key": "[",
      "span": 1,
      "keycode": 219
    },
    {
      "key": "]",
      "span": 1,
      "keycode": 221
    },
    {
      "key": "\\",
      "span": 1,
      "keycode": 220
    }
  ],
  [
    {
      "key": "Caps Lock",
      "span": 1,
      "keycode": 20
    },
    {
      "key": "A",
      "span": 1,
      "keycode": 65
    },
    {
      "key": "S",
      "span": 1,
      "keycode": 83
    },
    {
      "key": "D",
      "span": 1,
      "keycode": 68
    },
    {
      "key": "F",
      "span": 1,
      "keycode": 70
    },
    {
      "key": "G",
      "span": 1,
      "keycode": 71
    },
    {
      "key": "H",
      "span": 1,
      "keycode": 72
    },
    {
      "key": "J",
      "span": 1,
      "keycode": 74
    },
    {
      "key": "K",
      "span": 1,
      "keycode": 75
    },
    {
      "key": "L",
      "span": 1,
      "keycode": 76
    },
    {
      "key": ";",
      "span": 1,
      "keycode": 186
    },
    {
      "key": "'",
      "span": 1,
      "keycode": 222
    },
    {
      "key": "Enter",
      "span": 2,
      "keycode": 13
    }
  ],
  [
    {
      "key": "Shift",
      "span": 2,
      "keycode": 16
    },
    {
      "key": "Z",
      "span": 1,
      "keycode": 90
    },
    {
      "key": "X",
      "span": 1,
      "keycode": 88
    },
    {
      "key": "C",
      "span": 1,
      "keycode": 67
    },
    {
      "key": "V",
      "span": 1,
      "keycode": 86
    },
    {
      "key": "B",
      "span": 1,
      "keycode": 66
    },
    {
      "key": "N",
      "span": 1,
      "keycode": 78
    },
    {
      "key": "M",
      "span": 1,
      "keycode": 77
    },
    {
      "key": ",",
      "span": 1,
      "keycode": 188
    },
    {
      "key": ".",
      "span": 1,
      "keycode": 190
    },
    {
      "key": "/",
      "span": 1,
      "keycode": 191
    },
    {
      "key": "Shift",
      "span": 2,
      "keycode": 16
    }
  ],
  [
    {
      "key": "Ctrl",
      "span": 1,
      "keycode": 17
    },
    {
      "key": "Win",
      "span": 1,
      "keycode": 91
    },
    {
      "key": "Alt",
      "span": 1,
      "keycode": 18
    },
    {
      "key": "Space",
      "span": 8,
      "keycode": 32
    },
    {
      "key": "Alt",
      "span": 1,
      "keycode": 18
    },
    {
      "key": "Fn",
      "span": 1,
      "keycode": 0
    },
    {
      "key": "Ctrl",
      "span": 1,
      "keycode": 17
    }
  ]
]
</script>