class ProductEditor {
  mode;
  apiBaseUrl = 'http://localhost:8000/api/';
  productId;
  productVariationId;
  canvas;
  productDetail;
  imageDetail;
  borderRect;

  productImageUrl;
  mapStatus = false;

  currentFile = null;
  currentThemeId = -1;
  currentStickerId = -1;
  currentStickerFile = null;

  menuItems = [
    'designMenuItem',
    'textMenuItem',
    'photoMenuItem',
    'stickerListMenuItem',
    'themeListMenuItem'
  ];

  activePhoto = null;
  photoList = [];

  brightness = 0;
  effectStatus = {
    sepia: false,
    blackAndWhite: false,
  };

  mirrorStatus = {
    mirror1: false,
    mirror2: false,
  };

  input = {
    theme: 'all',
    sort: 'all'
  };

  textStatus = {
    bold: false,
    italic: false
  };

  fabricGroup = [];

  undoStack = [];
  redoStack = [];
  lastObjects = [];

  picker = {
    color: {
      status: 'hidden',
      current: 'rgb(239, 232, 224)',
    },
    font: {
      status: 'hidden',
      current: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font1.svg',
      list: [
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font1.svg', fontName: 'Londrina Solid', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font1.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font2.svg', fontName: 'Bauhaus Md BT', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font2.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font3.svg', fontName: 'Army', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font3.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font4.svg', fontName: 'Ravie', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font4.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font5.svg', fontName: 'Alice', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font5.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font6.svg', fontName: 'Chelsea Market', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font6.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font7.svg', fontName: 'font7', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font7.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font8.svg', fontName: 'Pacifico', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font8.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font9.svg', fontName: 'Stint Ultra Condensed', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font9.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font10.svg', fontName: 'Roboto Condensed', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font10.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font11.svg', fontName: 'font11', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font11.woff2' },
        // { fontIcon: 'img/product-editor/font-preview/font12.svg', fontName: '', fontUrl: 'assets/fonts/font12.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font13.svg', fontName: 'Caveat Brush', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font13.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font14.svg', fontName: 'Blackout-2AM', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font14.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font15.svg', fontName: 'Blackout-Midnight', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font15.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font16.svg', fontName: 'Open Sans Light', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font16.woff2' },
        { fontIcon: `${window.location.origin + '/admin/'}` + 'img/product-editor/font-preview/font17.svg', fontName: 'Playfair Display', fontUrl: `${window.location.origin + '/admin/fonts/product-editor'}` + '/font17.woff2' },
      ]
    }
  };

  ui = {
    photo: false,
    text: false,
  };

  designItemList = [];

  btn = document.getElementById('inline-btn');
  btnWidth = 85;
  btnHeight = 18;

  constructor(productId, productVariationId, mode) {
    this.productId = productId;
    this.productVariationId = productVariationId;
    this.mode = mode;

    console.log(this.productId, this.productVariationId);
  }

  async initialize() {
    document.body.innerHTML += this.editorHtml();
    this.productDetail = await this.fetchProductDetail();

    if (this.mode === 'admin') {
      document.getElementsByClassName('zoom-actions').item(0).style.display = 'none';
      document.getElementById('continueProductButton').style.display = 'none';
      document.getElementsByClassName('history-actions').item(0).style.display = 'none';
      document.getElementsByClassName('system-actions').item(0).style.display = 'flex';
      document.getElementById('designMenuItemContainer').innerHTML = this.adminEditorHtml();
    }

    this.generateFakeScreen(
      this.productDetail.containerWidth, this.productDetail.containerHeight
    );

    const canvasElement = document.getElementById('product-editor-canvas');
    const containerWidth = canvasElement.parentElement.clientWidth;
    const containerHeight = canvasElement.parentElement.clientHeight;

    canvasElement.width = containerWidth;
    canvasElement.height = containerHeight;

    if (this.mode === 'user') {
      this.loadFonts();
    }

    this.canvas = new fabric.Canvas('product-editor-canvas');
    this.canvas.backgroundColor = 'rgba(255, 255, 255, 0)';

    if (this.mode === 'user') {
      // Product setup
      const baseImgElement = new Image();
      baseImgElement.onload = () => {
        const fabricImage = new fabric.Image(baseImgElement);
        this.imageDetail = fabricImage;
        fabricImage.scaleToHeight(containerHeight / 2);
        fabricImage.scaleToWidth(containerWidth / 2);
        fabricImage.absolutePositioned = true;
        fabricImage.selectable = false;
        fabricImage.hoverCursor = 'default';
        fabricImage.hasControls = false;
        fabricImage.id = 'product';

        this.canvas.add(fabricImage);

        this.canvas.setZoom(1);
        this.canvas.moveTo(fabricImage, 1);

        this.canvas.viewportCenterObject(fabricImage);
        this.borderRect = new fabric.Rect({
          id: 'border-rect',
          left: this.productDetail.left,
          top: this.productDetail.top,
          width: this.productDetail.width,
          height: this.productDetail.height,
          fill: null,
          stroke: '#FFF',
          strokeWidth: 2,
          absolutePositioned: true,
          selectable: false,
          hasControls: false,
          hoverCursor: 'default',
          strokeDashArray: [9, 2]
        });

        this.canvas.add(this.borderRect);
        this.canvas.moveTo(this.borderRect, 99999);
        this.canvas.renderAll();

        setTimeout(() => {
          document.getElementById('canvas-container').classList.remove('fake-screen-width');
          this.resizeCanvas();
          document.getElementById('loader').style.display = 'none';
          document.getElementById('loader').style.zIndex = '-1';
        }, 1000);
      };
      baseImgElement.src = this.productDetail.imageLink;

      // Theme selectbox setup
      this.productDetail.themes.forEach((themeItem) => {
        const selectElement = document.getElementById('themeSelectBox');
        const newOption = document.createElement('option');
        newOption.value = themeItem.id;
        newOption.text = themeItem.themeName;
        selectElement.appendChild(newOption);
      });

      fabric.Canvas.prototype.customiseControls({
        tl: {
          action: 'rotate',
        },
        tr: {
          action: 'scale',
        },
        bl: {
          action: 'remove',
          cursor: 'pointer',
        },
        br: {
          action: 'moveUp',
          cursor: 'pointer',
        },
      });

      this.loadDesignContent();
    }

    document.getElementById('designMenuItem').addEventListener('click', () => {
      this.clickMenuItem('designMenuItem');
    });

    document.getElementById('closeEditorButton').addEventListener('click', () => {
      const confirmResult = window.confirm('Are you sure want exit?');
      if (!confirmResult) {
        return;
      }

      this.closeEditor();
    });

    if (this.mode === 'user') {
      this.canvas.on('mouse:wheel', (opt) => {
        const delta = opt.e.deltaY;
        let zoom = this.canvas.getZoom();

        zoom *= 0.999 ** delta;
        if (zoom > 20)
          zoom = 20;
        if (zoom < 0.01)
          zoom = 0.01;

        const canvasWidth = this.canvas.getWidth();
        const canvasHeight = this.canvas.getHeight();

        const x = canvasWidth / 2;
        const y = canvasHeight / 2;
        this.canvas.zoomToPoint({ x, y }, zoom);

        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      this.canvas.on('object:modified', (opt) => {
        const obj = opt.target;
        if (!obj) return;

        if (obj.id === 'one-image') {
          if (obj.left < this.productDetail.left + (obj.getWidth() / 2)) {
            obj.left = this.productDetail.left + (obj.getWidth() / 2);
          }

          if (obj.top < this.productDetail.top + (obj.getHeight() / 2)) {
            obj.top = this.productDetail.top + (obj.getHeight() / 2);
          }

          if (obj.left + obj.getWidth() * 1 > (this.productDetail.left + (obj.getWidth() / 2)) + this.productDetail.width) {
            obj.left = (this.productDetail.left + (obj.getWidth() / 2)) + this.productDetail.width - obj.getWidth() * 1;
          }

          if (obj.top + obj.getHeight() * 1 > (this.productDetail.top + (obj.getHeight() / 2)) + this.productDetail.height) {
            obj.top = (this.productDetail.top + (obj.getHeight() / 2)) + this.productDetail.height - obj.getHeight() * 1;
          }

          this.canvas.renderAll();
        }
      });

      this.canvas.on('object:scaling', (opt) => {
        const obj = opt.target;
        if (!obj) return;

        let status = {
          left: false,
          right: false,
          top: false,
          bottom: false,
        };

        if (obj.id === 'one-image') {
          if (!obj.originalScaleX) {
            obj.originalScaleX = obj.scaleX;
          }

          if (!obj.originalScaleY) {
            obj.originalScaleY = obj.scaleY;
          }

          if (obj.left < this.productDetail.left + (obj.getWidth() / 2)) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
            });
            status.left = false;
          } else {
            status.left = true;
          }

          if (obj.left + obj.getWidth() * 1 > (this.productDetail.left + (obj.getWidth() / 2)) + this.productDetail.width) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
            });
            status.right = false;
          } else {
            status.right = true;
          }

          if (obj.top < this.productDetail.top + (obj.getHeight() / 2)) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
            });
            status.top = false;
          } else {
            status.top = true;
          }

          if (obj.top + obj.getHeight() * 1 > (this.productDetail.top + (obj.getHeight() / 2)) + this.productDetail.height) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
            });
            status.bottom = false;
          } else {
            status.bottom = true;
          }

          if (status.bottom && status.top && status.left && status.right) {
            obj.originalScaleX = obj.scaleX;
            obj.originalScaleY = obj.scaleY;
          }
        } else {
          if (!obj.originalScaleX) {
            obj.originalScaleX = obj.scaleX;
          }

          if (!obj.originalScaleY) {
            obj.originalScaleY = obj.scaleY;
          }

          let status = {
            left: false,
            right: false,
            top: false,
            bottom: false,
          };

          if (obj.left < this.productDetail.left) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
              left: this.productDetail.left,
            });
            status.left = false;
          } else {
            status.left = true;
          }

          if (obj.left + obj.width * obj.scaleX > this.productDetail.left + this.productDetail.width) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
              left: this.productDetail.left + this.productDetail.width - obj.width * obj.scaleX,
            });
            status.right = false;
          } else {
            status.right = true;
          }

          if (obj.top < this.productDetail.top) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
              top: this.productDetail.top
            });
            status.top = false;
          } else {
            status.top = true;
          }

          if (obj.top + obj.height * obj.scaleY > this.productDetail.top + this.productDetail.height) {
            obj.set({
              scaleX: obj.originalScaleX,
              scaleY: obj.originalScaleY,
              top: this.productDetail.top + this.productDetail.height - obj.height * obj.scaleY
            });
            status.bottom = false;
          } else {
            status.bottom = true;
          }

          if (status.bottom && status.top && status.left && status.right) {
            obj.originalScaleX = obj.scaleX;
            obj.originalScaleY = obj.scaleY;
          }
        }

        this.canvas.renderAll();
      });

      // Custom zoom setup
      document.getElementById('zoomInButton').addEventListener('click', () => {
        this.zoomMainContainer(-50);
      });

      document.getElementById('zoomOutButton').addEventListener('click', () => {
        this.zoomMainContainer(50);
      });

      document.getElementById('zoomInButtonPreview').addEventListener('click', () => {
        this.zoomMainContainerPreview(50);
      });

      document.getElementById('zoomOutButtonPreview').addEventListener('click', () => {
        this.zoomMainContainerPreview(-50);
      });

      document.getElementById('undoButton').addEventListener('click', () => {
        this.undo();
      });

      document.getElementById('redoButton').addEventListener('click', () => {
        this.redo();
      });

      // Menu buttons setup
      document.getElementById('textMenuItem').addEventListener('click', () => {
        this.clickMenuItem('textMenuItem');
        this.focusText();
      });

      document.getElementById('photoMenuItem').addEventListener('click', () => {
        this.clickMenuItem('photoMenuItem');

        document.getElementById('photoMenuItemContainer').style.display = 'block';
        document.getElementById('photoContainerDetail').style.display = 'none';
      });

      document.getElementById('removeDesignButton').addEventListener('click', () => {
        this.resetDesign();
      });

      document.getElementById('backPhotos').addEventListener('click', () => {
        this.activePhoto = null;

        document.getElementById('photoMenuItemContainer').style.display = 'block';
        document.getElementById('photoContainerDetail').style.display = 'none';
      });

      document.getElementById('textInput').addEventListener('input', (event) => {
        this.changeInputValue(event.target.value);
      });

      document.getElementById('colorPicker').addEventListener('click', () => {
        this.onClickColorPicker();
      });

      document.getElementById('fontPicker').addEventListener('click', () => {
        this.onClickFontPicker();
      });

      document.getElementById('pickerFakeBackground').addEventListener('click', () => {
        if (this.picker.color.status === 'show') {
          this.onClickColorPicker();
        }

        if (this.picker.font.status === 'show') {
          this.onClickFontPicker();
        }
      });

      document.getElementById('boldPicker').addEventListener('click', () => {
        this.changeTextEffect('fontWeight');
      });

      document.getElementById('italicPicker').addEventListener('click', () => {
        this.changeTextEffect('italic');
      });

      document.getElementById('minusPicker').addEventListener('click', () => {
        this.changeFontSize(-4);
      });

      document.getElementById('plusPicker').addEventListener('click', () => {
        this.changeFontSize(4);
      });

      document.getElementById('leftPicker').addEventListener('click', () => {
        this.changePosition('left');
      });

      document.getElementById('upPicker').addEventListener('click', () => {
        this.changePosition('up');
      });

      document.getElementById('downPicker').addEventListener('click', () => {
        this.changePosition('down');
      });

      document.getElementById('rightPicker').addEventListener('click', () => {
        this.changePosition('right');
      });

      document.getElementById('sepiaPicker').addEventListener('click', () => {
        this.changeImageEffect('sepia');
      });

      document.getElementById('blackAndWhitePicker').addEventListener('click', () => {
        this.changeImageEffect('blackAndWhite');
      });

      document.getElementById('brightnessInput').addEventListener('input', (event) => {
        this.changeImageBrightness(event.target.value);
      });

      document.getElementById('leftImagePicker').addEventListener('click', () => {
        this.changeImagePosition('left');
      });

      document.getElementById('upImagePicker').addEventListener('click', () => {
        this.changeImagePosition('up');
      });

      document.getElementById('downImaggePicker').addEventListener('click', () => {
        this.changeImagePosition('down');
      });

      document.getElementById('rightImagePicker').addEventListener('click', () => {
        this.changeImagePosition('right');
      });

      document.getElementById('zoomInput').addEventListener('input', (event) => {
        this.changeZoom(event.target.value);
      });

      document.getElementById('rotateInput').addEventListener('input', (event) => {
        this.changeRotate(event.target.value);
      });

      document.getElementById('mirror1Picker').addEventListener('click', () => {
        this.changeMirror('mirror1');
      });

      document.getElementById('mirror2Picker').addEventListener('click', () => {
        this.changeMirror('mirror2');
      });

      document.getElementById('continueProductButton').addEventListener('click', () => {
        this.continueProduct();
      });

      document.getElementById('backSaveButton').addEventListener('click', () => {
        this.backSaveButton();
      });

      document.getElementById('continueCart').addEventListener('click', () => {
        this.continueCart();
      });

      // Sınır
      this.canvas.on('object:moving', (event) => {
        const obj = event.target;
        if (!obj) return;

        if (obj.id === 'one-image') {
          if (obj.left < this.productDetail.left + (obj.getWidth() / 2)) {
            obj.left = this.productDetail.left + (obj.getWidth() / 2);
          }

          if (obj.top < this.productDetail.top + (obj.getHeight() / 2)) {
            obj.top = this.productDetail.top + (obj.getHeight() / 2);
          }

          if (obj.left + obj.getWidth() * 1 > (this.productDetail.left + (obj.getWidth() / 2)) + this.productDetail.width) {
            obj.left = (this.productDetail.left + (obj.getWidth() / 2)) + this.productDetail.width - obj.getWidth() * 1;
          }

          if (obj.top + obj.getHeight() * 1 > (this.productDetail.top + (obj.getHeight() / 2)) + this.productDetail.height) {
            obj.top = (this.productDetail.top + (obj.getHeight() / 2)) + this.productDetail.height - obj.getHeight() * 1;
          }
        } else {
          if (obj.left < this.productDetail.left) {
            obj.left = this.productDetail.left;
          }
          if (obj.top < this.productDetail.top) {
            obj.top = this.productDetail.top;
          }
          if (obj.left + obj.width * obj.scaleX > this.productDetail.left + this.productDetail.width) {
            obj.left = this.productDetail.left + this.productDetail.width - obj.width * obj.scaleX;
          }
          if (obj.top + obj.height * obj.scaleY > this.productDetail.top + this.productDetail.height) {
            obj.top = this.productDetail.top + this.productDetail.height - obj.height * obj.scaleY;
          }
        }
      });

      // Setup history
      this.canvas.on('object:added', (event) => {
        const obj = event.target;
        if (obj.id === 'product' || obj.id === 'border-rect') {
          return;
        }

        this.undoStack.push({
          action: 'add',
          target: obj
        });
      });

      this.canvas.on('object:removed', (event) => {
        const obj = event.target;
        this.undoStack.push({
          action: 'remove',
          target: obj
        });
      });

      // Filter button setup
      document.getElementById('themeSelectBox').addEventListener('change', (event) => {
        this.input.theme = event.target.value;
        this.loadDesignContent();
      });

      // document.getElementById('sorteSelectBox').addEventListener('change', (event) => {
      //   this.input.sort = event.target.value;
      //   this.loadDesignContent();
      // });

      document.getElementById('dropZoneButton').addEventListener('click', () => {
        document.getElementById('dropZoneInput').click();
      });

      document.getElementById('dropZoneInput').addEventListener('change', (e) => {
        const files = e.target.files;
        const file = files[0];

        this.uploadFile(file);
      });

      const dropZone = document.getElementById('dropZone');

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');

        const files = e.dataTransfer.files;
        const file = files[0];

        this.uploadFile(file);
      });
    } else if (this.mode === 'admin') {
      // admin listener
      document.getElementById('productImageButton').addEventListener('click', () => {
        document.getElementById('productImageInput').click();
      });

      document.getElementById('productImageInput').addEventListener('change', (e) => {
        const files = e.target.files;
        const file = files[0];

        this.currentFile = file;
        this.uploadProduct(file);
      });

      document.getElementById('productRemoveButton').addEventListener('click', () => {
        this.removeProduct();
      });

      document.getElementById('saveChangesButton').addEventListener('click', () => {
        this.saveProduct();
      });

      document.getElementById('productMapButton').addEventListener('click', () => {
        this.changeMapStatus();
      });

      document.getElementById('stickerCheckbox').addEventListener('change', (event) => {
        this.productDetail.enabledSticker = event.target.checked;
      });

      document.getElementById('textCheckbox').addEventListener('change', (event) => {
        this.productDetail.enabledText = event.target.checked;
      });

      document.getElementById('imageCheckbox').addEventListener('change', (event) => {
        this.productDetail.enabledPhoto = event.target.checked;
      });

      document.getElementById('themeListMenuItem').addEventListener('click', () => {
        this.clickMenuItem('themeListMenuItem');
      });

      document.getElementById('stickerListMenuItem').addEventListener('click', () => {
        this.clickMenuItem('stickerListMenuItem');
      });

      document.getElementById('modalThemeSaveChanges').addEventListener('click', () => {
        if (this.currentThemeId === -1) {
          this.addTheme();
        } else {
          this.updateTheme();
        }

        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
      });

      document.getElementById('createThemeButton').addEventListener('click', () => {
        this.openThemeModal(-1);
      });

      document.getElementById('modalStickerSaveChanges').addEventListener('click', () => {
        if (this.currentStickerId === -1) {
          this.addSticker();
        } else {
          this.updateSticker();
        }

        const modal = document.getElementById('stickerModal');
        modal.style.display = 'none';
      });

      document.getElementById('createStickerButton').addEventListener('click', () => {
        this.openStickerModal(-1);
      });

      document.getElementById('stickerImageFileInput').addEventListener('change', (e) => {
        const files = e.target.files;
        const file = files[0];

        this.currentStickerFile = file;
      });
    }

    // Set responsive
    window.addEventListener('resize', () => this.resizeCanvas());

    if (this.mode === 'user') {
      setInterval(() => {
        const objects = this.canvas.getObjects();
        const current = objects.filter((query) => query.id !== 'border-rect' && query.id !== 'product');

        if (!current.find((query) => query.text) && this.lastObjects.find((query) => query.text)) {
          this.ui.text = false;
          this.clickMenuItem('designMenuItem');
        }

        if (!current.find((query) => query.id === 'one-image') && this.lastObjects.find((query) => query.id === 'one-image')) {
          this.ui.photo = false;
          this.clickMenuItem('designMenuItem');
        }

        this.lastObjects = current;
      }, 250);

      document.getElementById('stickerListMenuItem').style.display = 'none';
      document.getElementById('themeListMenuItem').style.display = 'none';
    } else if (this.mode === 'admin') {
      // fill editor
      this.organizeModal();
      this.loadStickerListData();

      this.productDetail.themes.forEach((themeItem) => {
        const selectElement = document.getElementById('themeSelectBoxModal');
        const newOption = document.createElement('option');
        newOption.value = themeItem.id;
        newOption.text = themeItem.themeName;
        selectElement.appendChild(newOption);
      });

      if (this.productDetail.id === 'none') {
        setTimeout(() => {
          document.getElementById('canvas-container').classList.remove('fake-screen-width');
          this.resizeCanvas();
          document.getElementById('loader').style.display = 'none';
          document.getElementById('loader').style.zIndex = '-1';
        }, 1000);
        return;
      }

      document.getElementById('stickerCheckbox').checked = this.productDetail.enabledSticker === 1 ? true : false;
      document.getElementById('textCheckbox').checked = this.productDetail.enabledText === 1 ? true : false;
      document.getElementById('imageCheckbox').checked = this.productDetail.enabledPhoto === 1 ? true : false;
      this.productImageUrl = this.productDetail.imageLink;
      this.initProduct();

      setTimeout(() => {
        this.borderRect = new fabric.Rect({
          id: 'map-area',
          left: this.productDetail.left,
          top: this.productDetail.top,
          width: this.productDetail.width,
          height: this.productDetail.height,
          fill: null,
          stroke: '#FFF',
          strokeWidth: 2,
          absolutePositioned: true,
          selectable: false,
          hasControls: false,
          hoverCursor: 'default',
          strokeDashArray: [9, 2]
        });

        this.canvas.add(this.borderRect);
        this.canvas.moveTo(this.borderRect, 99999);
        this.canvas.renderAll();

        setTimeout(() => {
          document.getElementById('canvas-container').classList.remove('fake-screen-width');
          this.resizeCanvas();
          document.getElementById('loader').style.display = 'none';
          document.getElementById('loader').style.zIndex = '-1';
        }, 250);
      }, 1000);
    }

    if (this.mode === 'user') {
      document.getElementById('secondStep').style.transform = `translateX(${document.getElementById('firstStep').offsetWidth}px`;
    }
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('left', Number(this.productDetail.left || 0));
    formData.append('top', Number(this.productDetail.top || 0));
    formData.append('width', Number(this.productDetail.width || 0));
    formData.append('height', Number(this.productDetail.height || 0));
    formData.append('containerWidth', Number(this.productDetail.containerWidth));
    formData.append('containerHeight', Number(this.productDetail.containerHeight));
    formData.append('enabledText', (this.productDetail.enabledText || false) ? 1 : 0);
    formData.append('enabledSticker', (this.productDetail.enabledSticker || false) ? 1 : 0);
    formData.append('enabledPhoto', (this.productDetail.enabledPhoto || false) ? 1 : 0);
    formData.append('productVariationId', this.productVariationId);
    formData.append('productId', this.productId);

    if (this.currentFile) {
      formData.append('imageFile', this.currentFile);
    }

    if (this.productDetail.id === 'none') {
      return fetch(`${this.apiBaseUrl}product/save`, {
        method: 'POST',
        body: formData,
      }).then((response) => response.json()).then(async (result) => {
        await this.loadStickerListData();
        this.loadStickerList();
        this.currentStickerFile = null;

        window.alert('Product is saved.');
        this.closeEditor();
        return result;
      });
    } else {
      let url = `${this.apiBaseUrl}product/edit`;

      return fetch(url, {
        method: 'POST',
        body: formData,
      }).then((response) => response.json()).then(async (result) => {
        await this.loadStickerListData();
        this.loadStickerList();
        this.currentStickerFile = null;
        window.alert('Product is updated.');
        this.closeEditor();
        return result;
      });
    }
  }

  continueProduct() {
    document.getElementById('firstStep').style.transform = `translateX(-${document.getElementById('firstStep').offsetWidth}px)`;
    document.getElementById('firstStep').style.position = `absolute`;
    document.getElementById('firstStep').style.visibility = `hidden`;

    document.getElementById('secondStep').style.visibility = `visible`;
    document.getElementById('secondStep').style.position = `unset`;
    document.getElementById('secondStep').style.transform = `translateX(0px)`;

    const objects = this.canvas.getObjects();
    const borderRect = objects.find((query) => query.id === 'border-rect');
    if (borderRect) {
      this.canvas.remove(borderRect);
    }

    const base64Image = this.canvas.toDataURL({ format: 'png', multiplier: 1 });

    document.getElementById('canvasPreview').src = base64Image;
  }

  backSaveButton() {
    this.borderRect = new fabric.Rect({
      id: 'border-rect',
      left: this.productDetail.left,
      top: this.productDetail.top,
      width: this.productDetail.width,
      height: this.productDetail.height,
      fill: null,
      stroke: '#FFF',
      strokeWidth: 2,
      absolutePositioned: true,
      selectable: false,
      hasControls: false,
      hoverCursor: 'default',
      strokeDashArray: [9, 2]
    });

    this.canvas.add(this.borderRect);
    this.canvas.moveTo(this.borderRect, 99999);
    this.canvas.renderAll();

    document.getElementById('secondStep').style.transform = `translateX(-1920px)`;
    document.getElementById('secondStep').style.position = `absolute`;
    document.getElementById('secondStep').style.visibility = `hidden`;

    document.getElementById('firstStep').style.visibility = `visible`;
    document.getElementById('firstStep').style.position = `unset`;
    document.getElementById('firstStep').style.transform = `translateX(0px)`;
  }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async continueCart() {
    const base64Image = this.canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    });

    const blob = this.dataURItoBlob(base64Image);
    const file = new File([blob], 'image.png');
    const url = await this.uploadCustomerProduct(file);

    const event = new CustomEvent('productEditorCompleted', {
      detail: {
        productId: this.productId,
        productVariationId: this.productVariationId,
        imageUri: url
      }
    });
    document.dispatchEvent(event);

    this.closeEditor();
  }

  closeEditor() {
    this.currentFile = null;
    this.currentThemeId = -1;
    this.currentStickerId = -1;
    this.currentStickerFile = -1;
    this.productId = null;
    this.productVariationId = null;
    document.getElementById('product-editor-view').remove();

    const event = new CustomEvent('productEditorClosed');
    document.dispatchEvent(event);
  }

  organizeModal() {
    const modal = document.getElementById('myModal');
    const modal2 = document.getElementById('stickerModal');

    window.onclick = (event) => {
      if (event.target == modal || event.target == modal2) {
        modal.style.display = 'none';
        modal2.style.display = 'none';
      }
    }

    const span = document.getElementsByClassName('close')[0];
    span.onclick = () => {
      modal.style.display = 'none';
    }

    const span2 = document.getElementsByClassName('close2')[0];
    span2.onclick = () => {
      modal2.style.display = 'none';
    }
  }

  openThemeModal(id) {
    const modal = document.getElementById('myModal');
    this.currentThemeId = id;
    if (id !== -1) {
      const currentTheme = this.productDetail.themes.find((query) => query.id === id);
      document.getElementById('modalThemeNameInput').value = currentTheme.themeName;
    }

    modal.style.display = 'block';
  }

  openStickerModal(id) {
    const modal = document.getElementById('stickerModal');
    this.currentStickerId = id;
    if (id !== -1) {
      const currentSticker = this.designItemList.find((query) => query.id === id);
      document.getElementById('themeSelectBoxModal').value = currentSticker.themeID + '';
    }

    modal.style.display = 'block';
  }

  addTheme() {
    const formData = new FormData();
    formData.append('themeName', document.getElementById('modalThemeNameInput').value);

    if (this.productId) {
      formData.append('productId', this.productId);
    }

    if (this.productVariationId) {
      formData.append('productVariationId', this.productVariationId);
    }

    return fetch(`${this.apiBaseUrl}theme/save`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then(async (result) => {
      this.productDetail = await this.fetchProductDetail();
      this.loadThemeList();
      document.getElementById('modalThemeNameInput').value = '';
      return result;
    });
  }

  removeTheme(id) {
    return fetch(`${this.apiBaseUrl}get/themes/delete/${id}`, {
      method: 'DELETE'
    }).then((response) => response.json()).then(async (result) => {
      this.productDetail = await this.fetchProductDetail();
      this.loadThemeList();
      return result;
    });
  }

  removeSticker(id) {
    return fetch(`${this.apiBaseUrl}theme/objects/delete/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json()).then(async (result) => {
      await this.loadStickerListData();
      this.loadStickerList();
      return result;
    });
  }

  addSticker() {
    const formData = new FormData();
    formData.append('themeId', document.getElementById('themeSelectBoxModal').value);
    formData.append('imageFile', this.currentStickerFile);

    return fetch(`${this.apiBaseUrl}theme/objects/save`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then(async (result) => {
      await this.loadStickerListData();
      this.loadStickerList();
      this.currentStickerFile = null;
      return result;
    });
  }

  updateSticker() {
    const formData = new FormData();
    formData.append('themeId', document.getElementById('themeSelectBoxModal').value);

    if (this.currentStickerFile !== null) {
      formData.append('image', this.currentStickerFile);
    }

    return fetch(`${this.apiBaseUrl}theme/objects/edit/${this.currentStickerId}`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then(async (result) => {
      await this.loadStickerListData();
      this.loadStickerList();
      this.currentStickerFile = null;

      const modal = document.getElementById('stickerModal');
      modal.style.display = 'none';
      return result;
    });
  }

  async loadStickerListData() {
    let data = [];
    await Promise.all(this.productDetail.themes.map(async (themeItem) => {
      let url = `${this.apiBaseUrl}theme/objects/get?themeId=${themeItem.id}`;
      const resData = await fetch(url)
        .then((value) => value.json())
        .then((result) => {
          if (!result.product) {
            return [];
          }

          return result.product;
        });

      data = data.concat(resData);
    }));

    this.designItemList = data;
    // this.designItemList = data.filter((query) => query.type === 'text-with-image');
  }

  updateTheme() {
    return fetch(`${this.apiBaseUrl}get/themes/${this.currentThemeId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        themeName: document.getElementById('modalThemeNameInput').value
      }),
    }).then((response) => response.json()).then(async (result) => {
      this.productDetail = await this.fetchProductDetail();
      this.loadThemeList();
      document.getElementById('modalThemeNameInput').value = '';

      const modal = document.getElementById('myModal');
      modal.style.display = 'none';
      return result;
    });
  }

  changeMapStatus() {
    this.mapStatus = !this.mapStatus;

    if (this.mapStatus) {
      const objects = this.canvas.getObjects();
      const mapAreaObject = objects.find((query) => query.id === 'map-area');
      if (mapAreaObject) {
        this.canvas.remove(mapAreaObject);
        this.canvas.renderAll();
      }

      document.getElementById('productMapButton').innerText = 'Mapping...';
      document.getElementById('productMapButton').style.opacity = '0.8';
      let isDrawing = false;
      let startPoint = 0;
      let endPoint = 0;
      let rect = null;

      this.canvas.on('mouse:down', (options) => {
        isDrawing = true;
        startPoint = this.canvas.getPointer(options.e);
        endPoint = startPoint;
        rect = new fabric.Rect({
          id: 'map-area',
          left: startPoint.x,
          top: startPoint.y,
          width: 1,
          height: 1,
          fill: null,
          stroke: '#FFF',
          strokeWidth: 2,
          absolutePositioned: true,
          hasControls: true,
          hoverCursor: 'default',
          strokeDashArray: [9, 2],
          selectable: false
        });
        this.canvas.add(rect);
      });

      this.canvas.on('mouse:move', (options) => {
        if (!isDrawing) return;

        endPoint = this.canvas.getPointer(options.e);
        rect.set({
          id: 'map-area',
          width: endPoint.x - startPoint.x,
          height: endPoint.y - startPoint.y
        });
        this.canvas.renderAll();
      });

      this.canvas.on('mouse:up', () => {
        isDrawing = false;
        this.canvas.remove(rect);

        rect = new fabric.Rect({
          id: 'map-area',
          left: startPoint.x,
          top: startPoint.y,
          width: endPoint.x - startPoint.x,
          height: endPoint.y - startPoint.y,
          fill: null,
          stroke: '#FFF',
          strokeWidth: 2,
          absolutePositioned: true,
          hasControls: true,
          hoverCursor: 'default',
          strokeDashArray: [9, 2],
          selectable: false
        });

        this.canvas.add(rect);
        this.canvas.renderAll();
        this.changeMapStatus();

        this.productDetail.width = endPoint.x - startPoint.x;
        this.productDetail.height = endPoint.y - startPoint.y;
        this.productDetail.left = startPoint.x;
        this.productDetail.top = startPoint.y;

        const canvasElement = document.getElementById('product-editor-canvas');
        const containerWidth = canvasElement.parentElement.clientWidth;
        const containerHeight = canvasElement.parentElement.clientHeight;

        this.productDetail.containerWidth = containerWidth;
        this.productDetail.containerHeight = containerHeight;
      });

    } else {
      document.getElementById('productMapButton').innerText = 'Create Map';
      document.getElementById('productMapButton').style.opacity = '1';
      this.canvas.off('mouse:down');
      this.canvas.off('mouse:move');
      this.canvas.off('mouse:up');
    }
  }

  positionBtn(obj) {
    const absCoords = this.getAbsoluteCoords(obj);

    this.btn.style.left = (absCoords.left - this.btnWidth / 2) + 'px';
    this.btn.style.top = (absCoords.top - this.btnHeight / 2) + 'px';
  }

  removeProduct() {
    this.productImageUrl = '';

    document.getElementById('productImagePreview')
      .style.backgroundImage = `url()`;
    document.getElementById('productImageButton')
      .style.display = 'block';
    document.getElementById('productRemoveButton')
      .style.display = 'none';
    document.getElementById('productMapButton')
      .style.display = 'none';
    document.getElementById('productImageInput').value = '';

    const objects = this.canvas.getObjects();
    const productItem = objects.find((query) => query.id === 'product');
    this.canvas.remove(productItem);
    this.canvas.renderAll();
  }

  uploadProduct(file) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return fetch(`${this.apiBaseUrl}editor/files/upload`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then((result) => {
      this.productImageUrl = result.ur;
      this.initProduct();
      return result;
    });
  }

  uploadCustomerProduct(file) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return fetch(`${this.apiBaseUrl}editor/files/upload`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then((result) => {
      return result.ur;
    });
  }

  initProduct() {
    document.getElementById('productImagePreview')
      .style.backgroundImage = `url(${this.productImageUrl})`;
    document.getElementById('productImageButton')
      .style.display = 'none';
    document.getElementById('productRemoveButton')
      .style.display = 'flex';
    document.getElementById('productMapButton')
      .style.display = 'block';

    fabric.Image.fromURL(this.productImageUrl, (fabricImage) => {
      const canvasElement = document.getElementById('product-editor-canvas');
      const containerWidth = canvasElement.parentElement.clientWidth;
      const containerHeight = canvasElement.parentElement.clientHeight;

      fabricImage.scaleToHeight(containerHeight / 2);
      fabricImage.scaleToWidth(containerWidth / 2);
      fabricImage.absolutePositioned = true;
      fabricImage.selectable = false;
      fabricImage.hoverCursor = 'default';
      fabricImage.hasControls = false;
      fabricImage.id = 'product';

      this.canvas.add(fabricImage);

      this.canvas.setZoom(1);
      this.canvas.moveTo(fabricImage, 1);

      this.canvas.viewportCenterObject(fabricImage);
      this.canvas.renderAll();
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('imageFile', file);

    return fetch(`${this.apiBaseUrl}editor/files/upload`, {
      method: 'POST',
      body: formData,
    }).then((response) => response.json()).then((result) => {
      this.photoList.push({ imageUrl: result.ur });
      this.organizePhotoList();

      this.clickPhotoDetail(
        this.photoList[this.photoList.length - 1]
      );
      return result;
    });
  }

  changeImageBrightness(value) {
    const imageElement = this.canvas.getObjects().find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    imageElement.filters[0] = new fabric.Image.filters.Contrast({
      contrast: parseInt(value, 10)
    });

    setTimeout(() => {
      imageElement.applyFilters();
      this.canvas.renderAll();
    }, 250);
  }

  scale(num, max) {
    return (num - 0) * (1 - 0) / (max - 0) + 0;
  }

  organizePhotoList() {
    const baseElement = document.getElementById('photoList');
    baseElement.innerHTML = '';

    this.photoList.forEach((item) => {
      baseElement.innerHTML += `<div class="photo-item" data-imageUrl="${item.imageUrl}" style="background-image: url(${item.imageUrl})">            <button class="editor-button photo-item-delete-button" data-imageUrl="${item.imageUrl}">
        <img src="${window.location.origin + '/admin'}/img/product-editor/x.svg">
      </button>
    </div>`;
    });

    setTimeout(() => {
      const photoElements = document.querySelectorAll('.photo-item');
      photoElements.forEach((element) => {
        element.addEventListener('click', (event) => {
          if (event.target.className !== 'photo-item') {
            return;
          }

          const imageUrl = element.getAttribute('data-imageUrl');
          const idx = this.photoList.findIndex((query) => query.imageUrl === imageUrl);
          if (idx === -1) {
            return;
          }

          this.clickPhotoDetail(this.photoList[idx]);
        });
      });

      const imageRemoveElements = document.querySelectorAll('.photo-item-delete-button');
      imageRemoveElements.forEach((element) => {
        element.addEventListener('click', () => {
          const imageUrl = element.getAttribute('data-imageUrl');

          const idx = this.photoList.findIndex((query) => query.imageUrl === imageUrl);
          if (idx === -1) {
            return;
          }

          this.photoList.splice(idx, 1);
          this.organizePhotoList();
        });
      });
    }, 500);
  }

  changeFontSize(value) {
    const objects = this.canvas.getObjects();

    const textElement = objects.find((query) => query.text);
    if (!textElement) {
      return;
    }

    const currentFontSize = textElement.getFontSize();
    textElement.setFontSize(currentFontSize + value);

    setTimeout(() => this.canvas.renderAll(), 250);
  }

  changePosition(type) {
    const objects = this.canvas.getObjects();

    const textElement = objects.find((query) => query.text);
    if (!textElement) {
      return;
    }

    if (type === 'right' || type === 'left') {
      let currentPos = textElement.getLeft();

      textElement.set({
        left: type === 'right' ? currentPos + 3 : currentPos - 3,
      });
    } else if (type === 'up' || type === 'down') {
      let currentPos = textElement.getTop();

      textElement.set({
        top: type === 'down' ? currentPos + 3 : currentPos - 3,
      });
    }

    setTimeout(() => this.canvas.renderAll(), 1);
  }

  changeImagePosition(type) {
    const objects = this.canvas.getObjects();

    const imageElement = objects.find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    if (type === 'right' || type === 'left') {
      let currentPos = imageElement.getLeft();

      imageElement.set({
        left: type === 'right' ? currentPos + 3 : currentPos - 3,
      });
    } else if (type === 'up' || type === 'down') {
      let currentPos = imageElement.getTop();

      imageElement.set({
        top: type === 'down' ? currentPos + 3 : currentPos - 3,
      });
    }

    setTimeout(() => this.canvas.renderAll(), 1);
  }

  changeRotate(value) {
    const objects = this.canvas.getObjects();

    const imageElement = objects.find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    imageElement.set({
      angle: parseFloat(value),
    }).setCoords();

    setTimeout(() => this.canvas.renderAll(), 1);
  }

  changeZoom(value) {
    const objects = this.canvas.getObjects();

    const imageElement = objects.find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    imageElement.setScaleX(parseFloat(value));
    imageElement.setScaleY(parseFloat(value));

    setTimeout(() => this.canvas.renderAll(), 1);
  }

  changeTextEffect(type) {
    const objects = this.canvas.getObjects();

    const textElement = objects.find((query) => query.text);
    if (!textElement) {
      return;
    }

    if (type === 'fontWeight') {
      this.textStatus.bold = !this.textStatus.bold;
      document.getElementById('boldPicker').style.background = this.textStatus.bold ? '#fff' : 'unset';
      textElement.set({
        fontWeight: this.textStatus.bold ? 'bold' : 'normal',
      });
    } else if (type === 'italic') {
      this.textStatus.italic = !this.textStatus.italic;
      document.getElementById('italicPicker').style.background = this.textStatus.italic ? '#fff' : 'unset';
      textElement.set({
        fontStyle: this.textStatus.italic ? 'italic' : 'normal',
      });
    }

    setTimeout(() => this.canvas.renderAll(), 250);
  }

  changeMirror(type) {
    const objects = this.canvas.getObjects();

    const imageElement = objects.find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    if (type === 'mirror1') {
      this.mirrorStatus.mirror1 = !this.mirrorStatus.mirror1;
      document.getElementById('mirror1Picker').style.background = this.mirrorStatus.mirror1 ? '#fff' : 'unset';
      imageElement.set({
        scaleX: -1,
      });
    } else if (type === 'mirror2') {
      this.mirrorStatus.mirror2 = !this.mirrorStatus.mirror2;
      document.getElementById('mirror2Picker').style.background = this.mirrorStatus.mirror2 ? '#fff' : 'unset';
      imageElement.set({
        scaleY: -1,
      });
    }

    setTimeout(() => this.canvas.renderAll(), 250);
  }

  changeImageEffect(type) {
    const objects = this.canvas.getObjects();

    const imageElement = objects.find((query) => query.id === 'one-image');
    if (!imageElement) {
      return;
    }

    if (type === 'sepia') {
      this.effectStatus.sepia = !this.effectStatus.sepia;
      document.getElementById('sepiaPicker').style.background = this.effectStatus.sepia ? '#fff' : 'unset';

      if (this.effectStatus.sepia) {
        const sepiaFilter = new fabric.Image.filters.Sepia2();
        imageElement.filters[1] = sepiaFilter;
      } else {
        imageElement.filters[1] = null;
      }
    } else if (type === 'blackAndWhite') {
      this.effectStatus.blackAndWhite = !this.effectStatus.blackAndWhite;
      document.getElementById('blackAndWhitePicker').style.background = this.effectStatus.blackAndWhite ? '#fff' : 'unset';

      if (this.effectStatus.blackAndWhite) {
        const grayFilter = new fabric.Image.filters.Grayscale();
        imageElement.filters[2] = grayFilter;
      } else {
        imageElement.filters[2] = null;
      }
    }

    imageElement.applyFilters();

    setTimeout(() => this.canvas.renderAll(), 250);
  }

  undo() {
    if (this.undoStack.length > 0) {
      const lastAction = this.undoStack.pop();
      if (lastAction.action === 'add') {
        this.canvas.remove(lastAction.target);
      } else if (lastAction.action === 'remove') {
        this.canvas.add(lastAction.target);
      }

      this.redoStack.push(lastAction);
      this.canvas.renderAll();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const nextAction = this.redoStack.pop();
      if (nextAction.action === 'add') {
        this.canvas.add(nextAction.target);
      } else if (nextAction.action === 'remove') {
        this.canvas.remove(nextAction.target);
      }

      this.undoStack.push(nextAction);
      this.canvas.renderAll();
    }
  }

  organizePicker(type) {
    if (type === 'color') {
      if (this.picker.color.status === 'hidden') {
        document.getElementById('colorPickerPopup').style.display = 'none';
        document.getElementById('pickerFakeBackground').style.display = 'none';
      } else {
        document.getElementById('colorPickerPopup').style.display = 'flex';
        document.getElementById('pickerFakeBackground').style.display = 'block';
      }
    } else {
      if (this.picker.font.status === 'hidden') {
        document.getElementById('fontPickerPopup').style.display = 'none';
        document.getElementById('pickerFakeBackground').style.display = 'none';
      } else {
        document.getElementById('fontPickerPopup').style.display = 'flex';
        document.getElementById('pickerFakeBackground').style.display = 'block';
      }
    }

    const elements = document.querySelectorAll('.color-item');

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const color = element.getAttribute('data-color');
        const objects = this.canvas.getObjects();

        const textElement = objects.find((query) => query.text);
        if (!textElement) {
          return;
        }

        this.picker.color.current = color;
        document.getElementById('colorPicker').style.background = color;
        textElement.set({
          fill: color,
        });
        this.canvas.renderAll();
      });
    });

    const fontElements = document.querySelectorAll('.picker-item.font-picker');

    fontElements.forEach((element) => {
      element.addEventListener('click', () => {
        const fontUrl = element.getAttribute('data-fontUrl');
        const objects = this.canvas.getObjects();

        const textElement = objects.find((query) => query.text);
        if (!textElement) {
          return;
        }

        const selectedFont = this.picker.font.list.find((query) => query.fontUrl === fontUrl);
        this.picker.font.current = selectedFont.fontIcon;
        document.getElementById('fontPicker').style.backgroundImage = 'url(' +
          selectedFont.fontIcon
          + ')';

        textElement.set({
          fontFamily: selectedFont.fontName,
        });
        setTimeout(() => this.canvas.renderAll(), 250);
      });
    });
  }

  loadFonts() {
    let fontCss = '';

    this.picker.font.list.forEach((item) => {
      fontCss += `
      @font-face {
        font-family: '${item.fontName}';
        src: url('${item.fontUrl}') format('woff2');
      }
      `;
    });

    const styleElement = document.createElement('style');
    styleElement.innerHTML = fontCss;

    document.head.appendChild(styleElement);
  }

  onClickColorPicker() {
    if (this.picker.color.status === 'show') {
      this.picker.color.status = 'hidden';
      this.organizePicker('color');
      return;
    }

    this.picker.color.status = 'show';
    this.organizePicker('color');
  }

  onClickFontPicker() {
    if (this.picker.font.status === 'show') {
      this.picker.font.status = 'hidden';
      this.organizePicker('font');
      return;
    }

    this.picker.font.status = 'show';
    this.organizePicker('font');
  }

  generateFakeScreen(width, height) {
    const style = document.createElement('style');
    const cssClass = `
      .fake-screen-width {
        min-width: ${width}px !important;
        min-height: ${height}px !important;
        width: ${width}px !important;
        height: ${height}px !important;
    }`;

    style.innerHTML = cssClass;
    document.head.appendChild(style);

    document.getElementById('canvas-container').classList.add('fake-screen-width');
  }

  resizeCanvas() {
    const container = document.getElementById('canvas-container');

    const ratio = this.canvas.getWidth() / this.canvas.getHeight();
    const containerWidth = container.clientWidth;

    const scale = containerWidth / this.canvas.getWidth();
    const zoom = this.canvas.getZoom() * scale;

    this.canvas.setDimensions({
      width: containerWidth,
      height: containerWidth / ratio
    });
    this.canvas.setViewportTransform([
      zoom, 0, 0, zoom, 0, 0
    ]);
  }

  changeInputValue(value) {
    const textObject = this.canvas.getObjects().find((query) => query.text);
    if (!textObject) {
      return;
    }

    textObject.set({
      text: value.length === 0 ? 'Please type text' : value,
    });
    this.canvas.renderAll();
  }

  resetDesign(objects = null) {
    if (objects === null) {
      objects = this.canvas.getObjects();
    }

    this.ui.text = false;
    this.ui.photo = false;

    objects.filter((query) => query.id !== 'border-rect' && query.id !== 'product')
      .forEach((design) => {
        this.canvas.remove(design);
        this.canvas.renderAll();
        this.clickMenuItem('designMenuItem');
        this.organizeMenu();
      });
  }

  async loadDesignContent() {
    if (this.designItemList.length === 0) {
      let list = [];
      await Promise.all(this.productDetail.themes.map(async (themeItem) => {
        let url = `${this.apiBaseUrl}theme/objects/get?themeId=${themeItem.id}`;
        const resData = await fetch(url)
          .then((value) => value.json())
          .then((result) => {
            if (!result.product) {
              return [];
            }

            return result.product.map((item) => {
              return {
                ...item,
                type: 'text-with-image',
              };
            });
          });

        list = list.concat(resData);
      }));

      // const list = await fetch(`${this.apiBaseUrl}theme/objects/get/all?themeId=All`)
      //   .then((value) => value.json())
      //   .then((result) => result.objects);

      this.designItemList = [];
      if (this.productDetail.enabledSticker) {
        this.designItemList = list;
      }

      if (this.productDetail.enabledPhoto) {
        // custom foto ekle
        // this.designItemList.push({

        // });
        this.designItemList.push({
          id: 99999,
          imageLink: `${window.location.origin + '/admin'}/img/product-editor/photo-item.jpg`,
          theme: 'general',
          type: 'photo',
        });
        //  = this.designItemList.concat(
        //   list.filter((query) => query.type === 'photo')
        // );
      }

      if (this.productDetail.enabledText) {
        // custom text ekle
        this.designItemList.push({
          id: 99998,
          imageLink: `${window.location.origin + '/admin'}/img/product-editor/text-item.jpg`,
          theme: 'general',
          type: 'text',
        });
        // this.designItemList = this.designItemList.concat(
        //   list.filter((query) => query.type === 'text')
        // );
      }

      this.designItemList.forEach((item) => {
        const listElement = document.getElementById('designList');

        const newItem = document.createElement('div');
        newItem.className = 'design-item';
        newItem.style.backgroundColor = 'rgb(94, 101, 62)';
        newItem.setAttribute('data-src', item.imageLink);
        newItem.setAttribute('data-type', item.type);

        const imgItem = document.createElement('img');
        imgItem.src = item.imageLink;

        newItem.append(imgItem);
        listElement.appendChild(newItem);
      });
    }

    const listElement = document.getElementById('designList');
    listElement.innerHTML = '';

    if (this.input.theme === 'all') {
      this.designItemList.forEach((item) => {
        const newItem = document.createElement('div');
        newItem.className = 'design-item';
        newItem.style.backgroundColor = 'rgb(94, 101, 62)';
        newItem.setAttribute('data-src', item.imageLink);
        newItem.setAttribute('data-type', item.type);

        const imgItem = document.createElement('img');
        imgItem.src = item.imageLink;

        newItem.append(imgItem);
        listElement.appendChild(newItem);
      });
    } else {
      const filteredList = this.designItemList.filter(
        (query) => query.themeID === Number(this.input.theme)
      );

      filteredList.forEach((item) => {
        const newItem = document.createElement('div');
        newItem.className = 'design-item';
        newItem.style.backgroundColor = 'rgb(94, 101, 62)';
        newItem.setAttribute('data-src', item.imageLink);
        newItem.setAttribute('data-type', item.type);

        const imgItem = document.createElement('img');
        imgItem.src = item.imageLink;

        newItem.append(imgItem);
        listElement.appendChild(newItem);
      });
    }

    this.listenDesignItems();
  }

  getAbsoluteCoords(object) {
    return {
      left: object.getLeft(),
      top: object.getTop()
    };
  }

  listenDesignItems() {
    const elements = document.querySelectorAll('.design-item');

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const designUrl = element.getAttribute('data-src');
        const type = element.getAttribute('data-type');

        // this.resetDesign();
        if (type === 'text-with-image') {
          const baseImgElement = new Image();
          baseImgElement.onload = () => {
            const designImage = new fabric.Image(baseImgElement);
            designImage.set({
              left: this.borderRect.left,
              top: this.borderRect.top,
              borderColor: '#DE896D',
              cornerColor: '#DE896D',
              transparentCorners: false,
              hasRotatingPoint: false
            });

            designImage.setControlsVisibility({
              mt: false,
              mb: false,
              ml: false,
              mr: false,
              bl: true,
              br: true,
              tl: true,
              tr: true,
            });

            designImage.customiseCornerIcons({
              settings: {
                borderColor: '#DE896D',
                cornerSize: 25,
                cornerShape: 'circle',
                cornerBackgroundColor: '#DE896D',
                cornerPadding: 10,
              },
              tl: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
              },
              tr: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
              },
              bl: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
              },
              br: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
              },
            }, () => {
              this.canvas.renderAll();
            });

            this.canvas.add(designImage);

            this.ui.text = true;
            // this.ui.photo = false;

            this.organizeMenu();
            if (this.productDetail.enabledText) {
              const text = new fabric.Text('Please type text', {
                left: this.borderRect.left + designImage.width,
                top: this.borderRect.top + (designImage.height / 2),
                fontSize: 26,
                fill: this.picker.color.current,
                hasRotatingPoint: false,
                fontFamily: this.picker.font.list.find(
                  (query) => query.fontIcon === this.picker.font.current
                ).fontName
              });

              text.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                bl: true,
                br: true,
                tl: true,
                tr: true,
              });

              text.customiseCornerIcons({
                settings: {
                  borderColor: '#DE896D',
                  cornerSize: 25,
                  cornerShape: 'circle',
                  cornerBackgroundColor: '#DE896D',
                  cornerPadding: 10,
                },
                tl: {
                  icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
                },
                tr: {
                  icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
                },
                bl: {
                  icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
                },
                br: {
                  icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
                },
              }, () => {
                this.canvas.renderAll();
              });

              text.on('selected', () => {
                this.clickMenuItem('textMenuItem');
              });

              text.on('deselected', () => {
                this.clickMenuItem('designMenuItem');
              });

              this.canvas.add(text);
              setTimeout(() => this.canvas.renderAll(), 250);
            }
          };
          baseImgElement.src = designUrl;
        } else if (type === 'text') {
          this.ui.text = true;
          // this.ui.photo = false;

          this.organizeMenu();
          const text = new fabric.Text('Please type text', {
            left: this.borderRect.left,
            top: this.borderRect.top,
            fontSize: 26,
            fill: this.picker.color.current,
            hasRotatingPoint: false,
            fontFamily: this.picker.font.list.find(
              (query) => query.fontIcon === this.picker.font.current
            ).fontName
          });

          text.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: true,
            br: true,
            tl: true,
            tr: true,
          });

          text.customiseCornerIcons({
            settings: {
              borderColor: '#DE896D',
              cornerSize: 25,
              cornerShape: 'circle',
              cornerBackgroundColor: '#DE896D',
              cornerPadding: 10,
            },
            tl: {
              icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
            },
            tr: {
              icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
            },
            bl: {
              icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
            },
            br: {
              icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
            },
          }, () => {
            this.canvas.renderAll();
          });

          text.on('selected', () => {
            this.clickMenuItem('textMenuItem');
          });

          text.on('deselected', () => {
            this.clickMenuItem('designMenuItem');
          });

          this.canvas.add(text);
          setTimeout(() => this.canvas.renderAll(), 250);
        } else if (type === 'photo') {
          this.ui.text = false;
          this.ui.photo = true;

          fabric.Image.fromURL(designUrl, (designImage) => {
            designImage.set({
              left: this.borderRect.left,
              top: this.borderRect.top,
              scaleX: 0.5,
              scaleY: 0.5,
              borderColor: '#DE896D',
              cornerColor: '#DE896D',
              transparentCorners: false,
              hasRotatingPoint: false,
              id: 'one-image-select'
            });

            designImage.setControlsVisibility({
              mt: false,
              mb: true,
              ml: false,
              mr: true,
              bl: true,
              br: true,
              tl: true,
              tr: true,
            });

            designImage.customiseCornerIcons({
              settings: {
                borderColor: '#DE896D',
                cornerSize: 25,
                cornerShape: 'circle',
                cornerBackgroundColor: '#DE896D',
                cornerPadding: 10,
              },
              tl: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
              },
              tr: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
              },
              bl: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
              },
              br: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
              },
              mr: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/arrow-right.svg',
              },
              mb: {
                icon: `${window.location.origin + '/admin'}/img` + '/product-editor/arrow-down.svg',
              },
            }, () => {
              this.canvas.renderAll();
            });

            designImage.on('selected', () => {
              this.clickMenuItem('photoMenuItem');
            });

            designImage.on('deselected', () => {
              if (this.activePhoto !== null) {
                return;
              }

              this.clickMenuItem('designMenuItem');
            });

            this.canvas.add(designImage);
          });

          this.organizeMenu();
        } else if (type === 'photo-with-sticker') {
          this.ui.text = false;
          this.ui.photo = true;

          const findResult = this.designItemList.find((query) => query.imageUrl === designUrl);

          fabric.loadSVGFromString(findResult.svgData, () => {
            const loadedObjects = new fabric.Group(this.fabricGroup);

            loadedObjects.set({
              scaleX: 0.5,
              scaleY: 0.5,
              lockMovementX: true,
              lockMovementY: true,
              lockScalingX: true,
              lockScalingY: true,
              lockUniScaling: true,
              lockRotation: true,
              selectable: false,
              hasRotatingPoint: false,
              hasControls: false,
              hasBorders: false,
              // left: this.borderRect.left,
              // top: this.borderRect.top,
              // borderColor: '#DE896D',
              // cornerColor: '#DE896D',
            });

            this.canvas.add(loadedObjects).centerObject(loadedObjects).renderAll();
          }, (item, object) => {
            object.set('id', item.getAttribute('id'));
            this.fabricGroup.push(object);
          });

          this.organizeMenu();
        }
      });
    });
  }


  organizeMenu() {
    if (this.ui.photo) {
      document.getElementById('photoMenuItem').style.display = 'flex';
    } else {
      document.getElementById('photoMenuItem').style.display = 'none';
    }

    if (this.ui.text) {
      document.getElementById('textMenuItem').style.display = 'flex';
    } else {
      document.getElementById('textMenuItem').style.display = 'none';
    }
  }

  clickPhotoDetail(activePhoto) {
    this.activePhoto = activePhoto;

    document.getElementById('photoMenuItemContainer').style.display = 'none';
    document.getElementById('photoContainerDetail').style.display = 'block';

    this.changeCurrentPhoto();
  }

  changeCurrentPhoto() {
    const objects = this.canvas.getObjects();
    let photoItem = objects.find((query) => query.id === 'one-image-select');

    if (!photoItem) {
      photoItem = objects.find((query) => query.id === 'one-image');
      if (!photoItem) {
        return;
      }
    }

    const width = photoItem.getWidth();
    const height = photoItem.getWidth();

    this.canvas.remove(photoItem);

    const baseImgElement = new Image();
    baseImgElement.onload = () => {
      const designImage = new fabric.Image(baseImgElement);
      // designImage.crossOrigin = 'Anonymous';

      const newWidth = designImage.width >= this.borderRect.width ? this.borderRect.width - 50 : designImage.width;
      const newHeight = designImage.height >= this.borderRect.height ? this.borderRect.height - 50 : designImage.height;
      designImage.set({
        left: this.borderRect.left + (newWidth / 2),
        top: this.borderRect.top + (newHeight / 2),
        width: newWidth,
        height: newHeight,
        borderColor: '#DE896D',
        cornerColor: '#DE896D',
        transparentCorners: false,
        hasRotatingPoint: false,
        id: 'one-image',
        originY: 'center',
        originX: 'center',
        crossOrigin: 'anonymous'
      });

      designImage.setControlsVisibility({
        mt: false,
        mb: true,
        ml: false,
        mr: true,
        bl: true,
        br: true,
        tl: true,
        tr: true,
      });

      designImage.customiseCornerIcons({
        settings: {
          borderColor: '#DE896D',
          cornerSize: 25,
          cornerShape: 'circle',
          cornerBackgroundColor: '#DE896D',
          cornerPadding: 10,
        },
        tl: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
        },
        tr: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
        },
        bl: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
        },
        br: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
        },
        mr: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/arrow-right.svg',
        },
        mb: {
          icon: `${window.location.origin + '/admin'}/img` + '/product-editor/arrow-down.svg',
        },
      }, () => {
        this.canvas.renderAll();
      });

      // designImage.on('moving', () => { this.positionBtn(designImage) });
      // designImage.on('scaling', () => { this.positionBtn(designImage) });
      // this.positionBtn(designImage);
      this.canvas.add(designImage);
    };
    baseImgElement.src = this.activePhoto.imageUrl;
    // fabric.Image.fromURL(this.activePhoto.imageUrl, (designImage) => {
    //   designImage.set({
    //     left: this.borderRect.left + (height / 2),
    //     top: this.borderRect.top + (width / 2),
    //     width: width,
    //     height: height,
    //     borderColor: '#DE896D',
    //     cornerColor: '#DE896D',
    //     transparentCorners: false,
    //     hasRotatingPoint: false,
    //     id: 'one-image',
    //     originY: 'center',
    //     originX: 'center',
    //   });

    //   designImage.setControlsVisibility({
    //     mt: false,
    //     mb: false,
    //     ml: false,
    //     mr: false,
    //     bl: true,
    //     br: true,
    //     tl: true,
    //     tr: true,
    //   });

    //   designImage.customiseCornerIcons({
    //     settings: {
    //       borderColor: '#DE896D',
    //       cornerSize: 25,
    //       cornerShape: 'circle',
    //       cornerBackgroundColor: '#DE896D',
    //       cornerPadding: 10,
    //     },
    //     tl: {
    //       icon: `${window.location.origin + '/admin'}/img` + '/product-editor/rotate.svg',
    //     },
    //     tr: {
    //       icon: `${window.location.origin + '/admin'}/img` + '/product-editor/resize.svg',
    //     },
    //     bl: {
    //       icon: `${window.location.origin + '/admin'}/img` + '/product-editor/remove.svg',
    //     },
    //     br: {
    //       icon: `${window.location.origin + '/admin'}/img` + '/product-editor/move.svg',
    //     },
    //   }, () => {
    //     this.canvas.renderAll();
    //   });

    //   designImage.on('moving', () => { this.positionBtn(designImage) });
    //   designImage.on('scaling', () => { this.positionBtn(designImage) });
    //   this.positionBtn(designImage);

    //   this.canvas.add(designImage);
    // });
  }

  clickMenuItem(menu) {
    const activeElement = document.getElementById(menu);
    activeElement.classList.add('active');
    document.getElementById(menu + 'Container').style.display = 'block';

    if (menu === 'designMenuItem') {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject) {
        this.canvas.discardActiveObject();
      }
    } else if (menu === 'themeListMenuItem') {
      this.ui.photo = false;
      this.ui.text = false;
      this.loadThemeList();
    } else if (menu === 'stickerListMenuItem') {
      this.ui.photo = false;
      this.ui.text = false;
      this.loadStickerList();
    }

    this.menuItems.filter((query) => query !== menu).forEach((menuItem) => {
      document.getElementById(menuItem).classList.remove('active');
      document.getElementById(menuItem + 'Container').style.display = 'none';
    });

    document.getElementById('photoContainerDetail').style.display = 'none';

    this.organizeMenu();
    setTimeout(() => document.getElementById('textInput').focus(), 250);
  }

  loadStickerList() {
    document.getElementById('stickerListItems').innerHTML = '';
    this.designItemList.forEach((item) => {
      document.getElementById('stickerListItems').innerHTML += `
      <div class="theme-list-item">
        <img class="sticker-img" src="${item.imageLink}">

        <div class="theme-list-item-actions">
          <img class="theme-edit-button" data-id="${item.id}" src="${window.location.origin + '/admin'}/img/product-editor/edit-2.svg">
          <img class="theme-remove-button" data-id="${item.id}" src="${window.location.origin + '/admin'}/img/product-editor/trash.svg">
        </div>
      </div>
      `;
    });

    const elements = document.querySelectorAll('.theme-edit-button');

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('data-id');
        this.openStickerModal(Number(id));
      });
    });

    const removeElements = document.querySelectorAll('.theme-remove-button');

    removeElements.forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('data-id');
        this.removeSticker(Number(id));
      });
    });
  }

  loadDesignData() {

  }

  loadThemeList() {
    document.getElementById('themeListItems').innerHTML = '';
    this.productDetail.themes.forEach((item) => {
      document.getElementById('themeListItems').innerHTML += `
      <div class="theme-list-item">
        <h5>${item.themeName}</h5>

        <div class="theme-list-item-actions">
          <img class="theme-edit-button" data-id="${item.id}" src="${window.location.origin + '/admin'}/img/product-editor/edit-2.svg">
          <img class="theme-remove-button" data-id="${item.id}" src="${window.location.origin + '/admin'}/img/product-editor/trash.svg">
        </div>
      </div>
      `;
    });

    const elements = document.querySelectorAll('.theme-edit-button');

    elements.forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('data-id');
        this.openThemeModal(Number(id));
      });
    });

    const removeElements = document.querySelectorAll('.theme-remove-button');

    removeElements.forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('data-id');
        this.removeTheme(Number(id));
      });
    });

    const selectElement = document.getElementById('themeSelectBoxModal');
    selectElement.innerHTML = '';
    this.productDetail.themes.forEach((themeItem) => {
      const newOption = document.createElement('option');
      newOption.value = themeItem.id;
      newOption.text = themeItem.themeName;
      selectElement.appendChild(newOption);
    });
  }

  focusText() {
    const objects = this.canvas.getObjects();
    const findResult = objects.find((query) => query.text);
    if (!findResult) {
      return;
    }

    this.canvas.setActiveObject(findResult);
  }

  zoomMainContainerPreview(delta) {
    const element = document.getElementById('canvasPreview');
    const val = Number(element.style.transform.replace('scale(', '').replace(')', ''));

    if (delta > 0) {
      const newVal = val + 0.1;
      element.style.transform = `scale(${newVal})`;
    } else {
      const newVal = val - 0.1;
      element.style.transform = `scale(${newVal})`;
    }
  }

  zoomMainContainer(delta) {
    let zoom = this.canvas.getZoom();

    zoom *= 0.999 ** delta;
    if (zoom > 20)
      zoom = 20;
    if (zoom < 0.01)
      zoom = 0.01;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    this.canvas.zoomToPoint({ x, y }, zoom);
  }

  fetchProductDetail() {
    let url = `${this.apiBaseUrl}product/get?`;

    if (this.productId) {
      url += `&productId=${this.productId}`;
    }

    if (this.productVariationId) {
      url += `&productVariationId=${this.productVariationId}`;
    }

    return fetch(url)
      .then((value) => value.json())
      .then(async (result) => {
        if (!result.product) {
          return {
            themes: [],
            id: 'none'
          };
        }


        let themeUrl = `${this.apiBaseUrl}get/themes?`;
        if (this.productId) {
          themeUrl += `productId=${this.productId}`;
        }

        if (this.productVariationId) {
          themeUrl += `&productVariationId=${this.productVariationId}`;
        }

        const themeListResult = await fetch(themeUrl).then((value) => value.json())
          .then((result) => result.themes);

        return {
          themes: themeListResult,
          ...result.product,
        };
      });
  }

  adminEditorHtml() {
    return `
      <div class="image-preview" id="productImagePreview">
        <button class="editor-button" id="productRemoveButton">
          <img src="${window.location.origin + '/admin'}/img/product-editor/x.svg">
        </button>
      </div>
      <button class="main-button" id="productImageButton">Select File</button>
      <input type="file" id="productImageInput">
      <button class="main-button" id="productMapButton">Create Map</button>

      <div class="input-container checkbox-container">
        <label class="checkbox-label" for="stickerCheckbox">Sticker</label>
        <input type="checkbox" id="stickerCheckbox" class="editor-checkbox">
      </div>

      <div class="input-container checkbox-container">
        <label class="checkbox-label" for="textCheckbox">Text</label>
        <input type="checkbox" id="textCheckbox" class="editor-checkbox">
      </div>

      <div class="input-container checkbox-container">
        <label class="checkbox-label" for="imageCheckbox">Photo</label>
        <input type="checkbox" id="imageCheckbox" class="editor-checkbox">
      </div>
    `;
  }

  editorHtml() {
    return `
    <div class="editor-container" id="product-editor-view">

    <div class="loading" id="loader">
      <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>

    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div id="themeModalContent">
        <br><br>
          <div class="input-container">
            <input maxlength="15" class="editor-input" id="modalThemeNameInput" type="text" placeholder="Theme name">
          </div>
          <button class="main-button" id="modalThemeSaveChanges" style="margin: 0px !important">
            Save
          </button>
        </div>
      </div>
    </div>

    <div id="stickerModal" class="modal">
    <div class="modal-content">
      <span class="close close2">&times;</span>
      <div>
      <br><br>
        <div class="input-container">
          <label class="input-label">Theme</label>
          <div class="custom-selectbox">
            <select class="editor-selectbox" id="themeSelectBoxModal">

            </select>
            <img class="appearance-icon" src="${window.location.origin + '/admin'}/img/product-editor/chevron-down.svg">
          </div>
        </div>
        <div class="input-container">
          <label class="input-label">File</label>
          <input class="editor-input" style="padding-top: 8px" type="file" id="stickerImageFileInput">
        </div>

        <button class="main-button" id="modalStickerSaveChanges" style="margin: 0px !important">
          Save
        </button>
      </div>
    </div>
  </div>

    <div class="app-container">
    <div id="firstStep" class="app-container">
      <div class="app-menu">
        <div class="app-menu-item active" id="designMenuItem">
          <img class="app-menu-item-image" src="${window.location.origin + '/admin'}/img/product-editor/edit.svg">
          <h2 class="app-menu-item-title">Design</h2>
        </div>
        <div class="app-menu-item" id="textMenuItem">
          <img class="app-menu-item-image" src="${window.location.origin + '/admin'}/img/product-editor/type.svg">
          <h2 class="app-menu-item-title">Text</h2>
        </div>
        <div class="app-menu-item" id="photoMenuItem">
          <img class="app-menu-item-image" src="${window.location.origin + '/admin'}/img/product-editor/image.svg">
          <h2 class="app-menu-item-title">Photo</h2>
        </div>
        <div class="app-menu-item" id="themeListMenuItem">
          <img class="app-menu-item-image" src="${window.location.origin + '/admin'}/img/product-editor/list.svg">
          <h2 class="app-menu-item-title">Theme</h2>
        </div>
        <div class="app-menu-item" id="stickerListMenuItem">
          <img class="app-menu-item-image" src="${window.location.origin + '/admin'}/img/product-editor/list.svg">
          <h2 class="app-menu-item-title">Sticker</h2>
        </div>
      </div>
      <div class="app-menu-content">
        <div class="content-container" id="themeListMenuItemContainer" style="overflow-y: scroll">
          <button class="main-button" id="createThemeButton" style="margin: 0 0 20px 0 !important">
            Create Theme
          </button>
          <div id="themeListItems"></div>
        </div>

        <div class="content-container" id="stickerListMenuItemContainer" style="overflow-y: scroll">
          <button class="main-button" id="createStickerButton" style="margin: 0 0 20px 0 !important">
            Create Sticker
          </button>
          <div id="stickerListItems">

          </div>
        </div>
        <div class="content-container" id="designMenuItemContainer">
          <div class="input-container">
            <label class="input-label">Theme</label>
            <div class="custom-selectbox">
              <select class="editor-selectbox" id="themeSelectBox">
                <option value="all">All Designs</option>
              </select>
              <img class="appearance-icon" src="${window.location.origin + '/admin'}/img/product-editor/chevron-down.svg">
            </div>
          </div>

          <!--
          <div class="input-container">
            <label class="input-label">Sorte</label>
            <div class="custom-selectbox">
              <select class="editor-selectbox" id="sorteSelectBox">
                <option value="all">All Types</option>
                <option value="text">Text & Design</option>
                <option value="foto">Foto and Design</option>
              </select>
              <img class="appearance-icon" src="${window.location.origin + '/admin'}/img/product-editor/chevron-down.svg">
            </div>
          </div>
          -->

          <div class="design-list" id="designList">

          </div>
        </div>

        <div class="content-container" id="textMenuItemContainer">
          <div class="remove-button" id="removeDesignButton">
            <img src="${window.location.origin + '/admin'}/img/product-editor/remove.svg" alt="">
          </div>
          <h5 class="remove-button-text">Remove</h5>

          <hr class="line">
          <div class="input-container">
            <input maxlength="15" class="editor-input" id="textInput" type="text" placeholder="Text">
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Font</label>
            <div class="font-picker" id="fontPicker">&nbsp;</div>

            <div class="popup" id="fontPickerPopup">
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font1.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font1.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font2.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font2.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font3.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font3.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font4.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font4.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font5.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font5.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font6.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font6.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font7.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font7.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font8.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font8.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font9.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font9.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font10.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font10.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font11.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font11.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font13.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font13.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font14.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font14.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font15.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font15.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font16.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font16.svg');">&nbsp;</div>
              </div>
              <div class="picker-item font-picker" data-fontUrl="${window.location.origin + '/admin'}/fonts/product-editor/font17.woff2">
                <div class="font-item" style="background-image: url('${window.location.origin + '/admin'}/img/product-editor/font-preview/font17.svg');">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="picker-fake-background" id="pickerFakeBackground">&nbsp;</div>

          <div class="input-container picker-container">
            <label class="inline-label">Color</label>
            <div class="color-picker" id="colorPicker">&nbsp;</div>

            <div class="popup" id="colorPickerPopup">
              <div class="picker-item color-item" data-color="rgb(239, 232, 224)"
                style="background: rgb(239, 232, 224);"></div>
              <div class="picker-item color-item" data-color="rgb(189, 172, 153)"
                style="background: rgb(189, 172, 153);"></div>
              <div class="picker-item color-item" data-color="rgb(128, 118, 112)"
                style="background: rgb(128, 118, 112);"></div>
              <div class="picker-item color-item" data-color="rgb(66, 57, 50)" style="background: rgb(66, 57, 50);">
              </div>
              <div class="picker-item color-item" data-color="rgb(237, 201, 189)"
                style="background: rgb(237, 201, 189);"></div>
              <div class="picker-item color-item" data-color="rgb(234, 140, 115)"
                style="background: rgb(234, 140, 115);"></div>
              <div class="picker-item color-item" data-color="rgb(204, 103, 86)" style="background: rgb(204, 103, 86);">
              </div>
              <div class="picker-item color-item" data-color="rgb(140, 47, 58)" style="background: rgb(140, 47, 58);">
              </div>
              <div class="picker-item color-item" data-color="rgb(226, 166, 166)"
                style="background: rgb(226, 166, 166);"></div>
              <div class="picker-item color-item" data-color="rgb(199, 211, 182)"
                style="background: rgb(199, 211, 182);"></div>
              <div class="picker-item color-item" data-color="rgb(104, 150, 107)"
                style="background: rgb(104, 150, 107);"></div>
              <div class="picker-item color-item" data-color="rgb(49, 91, 50)" style="background: rgb(49, 91, 50);">
              </div>
              <div class="picker-item color-item" data-color="rgb(171, 206, 203)"
                style="background: rgb(171, 206, 203);"></div>
              <div class="picker-item color-item" data-color="rgb(76, 138, 140)" style="background: rgb(76, 138, 140);">
              </div>
              <div class="picker-item color-item" data-color="rgb(38, 109, 114)" style="background: rgb(38, 109, 114);">
              </div>
              <div class="picker-item color-item" data-color="rgb(211, 229, 239)"
                style="background: rgb(211, 229, 239);"></div>
              <div class="picker-item color-item" data-color="rgb(123, 179, 198)"
                style="background: rgb(123, 179, 198);"></div>
              <div class="picker-item color-item" data-color="rgb(61, 120, 147)" style="background: rgb(61, 120, 147);">
              </div>
              <div class="picker-item color-item" data-color="rgb(22, 65, 94)" style="background: rgb(22, 65, 94);">
              </div>
              <div class="picker-item color-item" data-color="rgb(244, 211, 224)"
                style="background: rgb(244, 211, 224);"></div>
              <div class="picker-item color-item" data-color="rgb(234, 178, 195)"
                style="background: rgb(234, 178, 195);"></div>
              <div class="picker-item color-item" data-color="rgb(172, 164, 216)"
                style="background: rgb(172, 164, 216);"></div>
              <div class="picker-item color-item" data-color="rgb(127, 69, 126)" style="background: rgb(127, 69, 126);">
              </div>
              <div class="picker-item color-item" data-color="rgb(86, 33, 86)" style="background: rgb(86, 33, 86);">
              </div>
              <div class="picker-item color-item" data-color="rgb(255, 235, 202)"
                style="background: rgb(255, 235, 202);"></div>
              <div class="picker-item color-item" data-color="rgb(237, 180, 112)"
                style="background: rgb(237, 180, 112);"></div>
              <div class="picker-item color-item" data-color="rgb(209, 115, 51)" style="background: rgb(209, 115, 51);">
              </div>
              <div class="picker-item color-item" data-color="rgb(150, 58, 8)" style="background: rgb(150, 58, 8);">
              </div>
              <div class="picker-item color-item" data-color="rgb(119, 35, 16)" style="background: rgb(119, 35, 16);">
              </div>
              <div class="picker-item color-item" data-color="rgb(255, 255, 255)"
                style="background: rgb(255, 255, 255);"></div>
              <div class="picker-item color-item" data-color="rgb(217, 217, 217)"
                style="background: rgb(217, 217, 217);"></div>
              <div class="picker-item color-item" data-color="rgb(156, 155, 155)"
                style="background: rgb(156, 155, 155);"></div>
              <div class="picker-item color-item" data-color="rgb(87, 87, 86)" style="background: rgb(87, 87, 86);">
              </div>
              <div class="picker-item color-item" data-color="rgb(0, 0, 0)" style="background: rgb(0, 0, 0);"></div>
              <div class="picker-item color-item" data-color="rgb(255, 228, 36)" style="background: rgb(255, 228, 36);">
              </div>
              <div class="picker-item color-item" data-color="rgb(247, 147, 30)" style="background: rgb(247, 147, 30);">
              </div>
              <div class="picker-item color-item" data-color="rgb(205, 46, 46)" style="background: rgb(205, 46, 46);">
              </div>
              <div class="picker-item color-item" data-color="rgb(113, 163, 93)" style="background: rgb(113, 163, 93);">
              </div>
              <div class="picker-item color-item" data-color="rgb(74, 181, 224)" style="background: rgb(74, 181, 224);">
              </div>
            </div>
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Effect</label>
            <div class="picker-list">
              <div class="option-picker" id="boldPicker">B</div>
              <div class="option-picker" id="italicPicker">I</div>
            </div>
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Size</label>
            <div class="picker-list">
              <div class="option-picker size-picker" id="minusPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/minus.svg">
              </div>
              <div class="option-picker size-picker" id="plusPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/plus.svg">
              </div>
            </div>
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Position</label>
            <div class="picker-list">
              <div class="option-picker size-picker" id="leftPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-left.svg">
              </div>
              <div class="option-picker size-picker" id="upPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-up.svg">
              </div>
              <div class="option-picker size-picker" id="downPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-down.svg">
              </div>
              <div class="option-picker size-picker" id="rightPicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-right.svg">
              </div>
            </div>
          </div>
        </div>

        <div class="content-container" id="photoMenuItemContainer">
          <div id="photoContainerList">
            <div id="photoList">
            </div>
            <p class="info-text">You can drag your photos to customize the product.</p>

            <button class="main-button" id="dropZoneButton">Select File</button>
            <input type="file" id="dropZoneInput" multiple>

            <div class="drag-zone" id="dropZone">
              <p class="info-text">Drag your photos here</p>
            </div>
          </div>
        </div>

        <div class="content-container" id="photoContainerDetail">
          <div class="remove-button" id="backPhotos">
            <img src="${window.location.origin + '/admin'}/img/product-editor/camera.svg" alt="">
          </div>
          <h5 class="remove-button-text">Back</h5>

          <hr class="line">

          <div class="input-container picker-container">
            <label class="inline-label">Effect</label>
            <div class="picker-list">
              <div class="option-picker effect-picker" id="sepiaPicker">Sepia</div>
              <div class="option-picker effect-picker" id="blackAndWhitePicker">Black and White</div>
            </div>
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Brightness</label>
            <input class="slider-input" id="brightnessInput" type="range" min="-255" max="255" value="0">
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Zoom</label>
            <input class="slider-input" id="zoomInput" type="range" min="0.5" max="2" step="0.1" value="1">
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Rotate</label>
            <input class="slider-input" id="rotateInput" type="range" min="0" max="360" step="1" value="0">
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Position</label>
            <div class="picker-list">
              <div class="option-picker size-picker" id="leftImagePicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-left.svg">
              </div>
              <div class="option-picker size-picker" id="upImagePicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-up.svg">
              </div>
              <div class="option-picker size-picker" id="downImaggePicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-down.svg">
              </div>
              <div class="option-picker size-picker" id="rightImagePicker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-right.svg">
              </div>
            </div>
          </div>

          <div class="input-container picker-container">
            <label class="inline-label">Mirror</label>
            <div class="picker-list">
              <div class="option-picker" id="mirror1Picker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/mirror1.svg">
              </div>
              <div class="option-picker" id="mirror2Picker">
                <img src="${window.location.origin + '/admin'}/img/product-editor/mirror2.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="app-canvas-container" id="canvas-container">
        <div class="canvas-header">
          <div class="canvas-empty-container">&nbsp;</div>
          <div class="canvas-title-container">
            <h2 class="canvas-title">
              <img src="http://localhost:8000/admin/img/logo.svg">
            </h2>
          </div>
          <div class="canvas-action-container">
            <button class="editor-button" id="closeEditorButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/x.svg">
            </button>
          </div>
        </div>
        <canvas id="product-editor-canvas"></canvas>
        <!-- <input type="button" value="Some button" id="inline-btn" style="position: absolute; width: 85px; height: 18px;">-->

        <div class="canvas-bottom">
          <div class="system-actions">
            <button class="main-button" id="saveChangesButton">
              Save Changes
            </button>
          </div>
          <div class="history-actions">
            <button class="editor-button" id="undoButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/undo.svg">
            </button>
            <button class="editor-button" id="redoButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/redo.svg">
            </button>
          </div>
          <div class="zoom-actions">
            <button class="editor-button" id="zoomInButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/zoom-in.svg">
            </button>
            <button class="editor-button" id="zoomOutButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/zoom-out.svg">
            </button>
          </div>

          <div class="continue-actions">
            <button class="editor-button" id="continueProductButton">
              <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-right.svg">
            </button>
          </div>
        </div>
      </div>
      </div>

      ${this.secondStepHtml()}
    </div>
  </div>
    `;
  }

  secondStepHtml() {
    return `
    <div id="secondStep" class="app-container">
  <div class="app-menu back-menu">
    <button class="editor-button" id="backSaveButton">
    <img src="${window.location.origin + '/admin'}/img/product-editor/arrow-left.svg">
  </button>
  </div>
  <div class="app-menu-content">
    <div class="content-container success-container">
      <img class="success-img" src="${window.location.origin + '/admin'}/img/product-editor/success.gif">

      <h1 class="success-title">Wow, sieht echt super aus!</h1>
      <h3 class="success-text">Wir fertigen dein Geschenk genau so an, wie du es online gestaltet hast. Willst du doch noch etwas ändern? Klick dann auf "Ändern".</h3>
    </div>
  </div>
  <div class="app-canvas-container" id="canvas-container">
    <div class="canvas-header">
      <div class="canvas-empty-container">&nbsp;</div>
      <div class="canvas-title-container">
        <h2 class="canvas-title">ExampleApp</h2>
      </div>
      <div class="canvas-action-container">
        &nbsp;
      </div>
    </div>

    <img src="" id="canvasPreview" style="transform: scale(1)">

    <div class="canvas-bottom">
      <div class="system-actions">
        <button class="main-button" id="saveChangesButton">
          Save Changes
        </button>
      </div>
      <div class="history-actions">
        &nbsp;
      </div>
      <div class="zoom-actions">
        <button class="editor-button" id="zoomInButtonPreview">
          <img src="${window.location.origin + '/admin'}/img/product-editor/zoom-in.svg">
        </button>
        <button class="editor-button" id="zoomOutButtonPreview">
          <img src="${window.location.origin + '/admin'}/img/product-editor/zoom-out.svg">
        </button>
      </div>

      <div class="continue-actions">
        <button class="main-button" id="continueCart" style="margin: 0 !important;min-height: 48px;
        min-width: 120px;">
          Continue
        </button>
      </div>
    </div>
  </div>
</div>
    `;
  }
}
