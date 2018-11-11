export const IMAGE_URLS = [
  { text: 'cat', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/CzXTtJV.jpg' },
  { text: 'dog', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/OB0y6MR.jpg' },
  { text: 'fox', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/14447103450_2d0ff8802b_z_d.jpg' },
  { text: 'cheetah', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/26541536141_41abe98db3_z_d.jpg' },
  { text: 'bird', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/3168662394_7d7103de7d_z_d.jpg' },
  { text: 'goldfish', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/1349366952_982df2276f_z_d.jpg' },
  { text: 'whale', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/8441256181_4e98d8bff5_z_d.jpg' },
  { text: 'bridge', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/Bvke53p.jpg' },
  { text: 'lighthouse', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/1572613671_7311098b76_z_d.jpg' },
  { text: 'airplane', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/14821526429_5c6ea60405_z_d.jpg' },
  { text: 'sailboat', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/6115759179_86316c08ff_z_d.jpg' },
  { text: 'cello', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/4595137268_0e3f2b9aa7_z_d.jpg' },
  { text: 'violin', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/7171202720_b2637866ec_z_d.jpg' },
  { text: 'piano', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/3081748027_0ee3d59fea_z_d.jpg' },
  { text: 'apple', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/9359257263_81b080a039_z_d.jpg' },
  { text: 'orange', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/5522940446_0d5724d43a_z_d.jpg' },
  { text: 'flower', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/8007075227_dc958c1fe6_z_d.jpg' },
  { text: 'mushroom', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/24800673529_64272a66ec_z_d.jpg' },
  { text: 'coffee', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/9684880330_9b4698f7cb_z_d.jpg' },
  { text: 'wine', value: 'https://mishig25.github.io/vizconvnets/sample_imgs/11349066413_99c32dee4a_z_d.jpg' }
]

var counter = 0;
export function getRandomImage(){
  const item = IMAGE_URLS[counter % IMAGE_URLS.length];
  counter = counter + 1;
  return item.value;
}
