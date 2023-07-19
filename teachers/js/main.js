
$(".toggler").click(function () {
    $(".panel-left").show();
});

$(".close").click(function () {
    $(".panel-left").hide();
});

$(document).ready(function () {
    $("#tabs").tabs();
});

function increase() {
    var input = document.getElementById('quantity');
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
    var fontSizeInput = $('#quantity');
    var fontSize = parseInt(fontSizeInput.val()) + 'px';
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        const coloredSpan = $('<span></span>').css('font-size', fontSize).text(selection.toString());
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(coloredSpan[0]);
    }
}
function decrease() {
    var input = document.getElementById('quantity');
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value = value < 1 ? 0 : value - 1;
    input.value = value;
    var fontSizeInput = $('#quantity');
    var fontSize = parseInt(fontSizeInput.val()) + 'px';
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        const coloredSpan = $('<span></span>').css('font-size', fontSize).text(selection.toString());
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(coloredSpan[0]);
    }
}

$(document).ready(function () {
    counter = 1; question = 1;
    $(document).on('click', '.add-choices', function () {
        var name = $(this).attr('id');
        $(this).siblings('.options').append(`<label class="choices position-relative text-start d-flex align-items-center btn border border-info my-1 text-primary form-width position-relative bg-light py-3" for="option` + counter + `">
                <div class="number border me-2 fw-semibold px-2"> <span class="text-element">A</span></div><span class="text-element">option</span>
                 <input type="radio" id="option`+ counter + `" name="` + name + `" class="d-none">
                 <span class="cross position-absolute top-25 rounded-circle bg-secondary px-1 text-decoration-none text-white">X</span>
             </label>`);
        counter++;
    });
    $(document).on('click', '.add-space', function (event) {
        $(this).prev('.paragraph-text').append(' <input type="text">');
    });
    $(document).on('click', '.add-text', function (event) {
        var newText = $('<div class="added-content"><div class="fst-italic text-element" confidential="true">New Text</div></div>');
        $('.questions-div').append(newText);
    });
    $(document).on('click', '.text-element', function () {
        $('.text-element').removeClass('selected');
        $('#quantity').val(14);
        $(this).addClass('selected');
    });
    $(document).on('change', '#font-select', function () {
        var font = $(this).val();
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            const coloredSpan = $('<span></span>').css('font-family', font).text(selection.toString());
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(coloredSpan[0]);
        }
    });
    $(document).on('change', '#quantity', function () {
        var fontSizeInput = $('#quantity');
        var fontSize = parseInt(fontSizeInput.val()) + 'px';
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            const coloredSpan = $('<span></span>').css('font-size', fontSize).text(selection.toString());
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(coloredSpan[0]);
        }
    });
    $('.color').on('input', function () {
        var color = $(this).val();
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            const coloredSpan = $('<span></span>').css('color', color).text(selection.toString());
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(coloredSpan[0]);
        }
    });
    $(document).on('click', '.italic', function() {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
          const isItalic = document.queryCommandState('italic');
  
          if (selection.rangeCount === 1 && $(selection.anchorNode).closest('li').length === 0) {
            // Single element selection
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
  
            const span = $('<span></span>').css('font-style', isItalic ? 'normal' : 'italic').text(selectedText);
            range.deleteContents();
            range.insertNode(span[0]);
          } else {
            // Multiple list item selection
            const ranges = [];
            for (let i = 0; i < selection.rangeCount; i++) {
              const range = selection.getRangeAt(i);
              if ($(range.commonAncestorContainer).closest('li').length > 0) {
                ranges.push(range);
              }
            }
  
            ranges.forEach(function(range) {
              const selectedText = range.toString();
              const span = $('<span></span>').css('font-style', isItalic ? 'normal' : 'italic').text(selectedText);
              range.deleteContents();
              range.insertNode(span[0]);
            });
          }
        }
      });
    $(document).on('click', '.line-height', function () {
        var lineHeight = prompt('Enter line height value:');
        $('.text-element.selected').css('line-height', lineHeight);
    });
    $(document).on('click', '.list', function () {
        var $selectedElement = $('.text-element.selected');
        if ($selectedElement.hasClass('is-list')) {
            var listItems = $selectedElement.find('li').map(function () {
                return $(this).text().trim();
            }).get();
            var text = listItems.join('\n');
            $selectedElement.html(text);
            $selectedElement.removeClass('is-list');
        } else {
            var text = $selectedElement.text().trim();

            if (text !== '') {
                var lines = text.split('\n');

                var listItems = lines.map(function (line) {
                    if (line.trim() !== '') {
                        return '<li>' + line + '</li>';
                    }
                }).join('');

                var list = '<ul>' + listItems + '</ul>';
                $selectedElement.html(list);
                $selectedElement.addClass('is-list');
            }
        }
    });
    $(document).on('click', '.delete-btn', function () {
        $('.text-element.selected').parents('.added-content').first().remove();
    });
});

function toggleBold() {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var selectedText = range.toString();

    if (selectedText.length > 0) {
        var newNode = document.createElement("b");
        newNode.classList.add("fw-bold"); // Add the "bold" class to the new element
        newNode.textContent = selectedText;

        if (isTextBold(range)) {
            removeBold(range);
        } else {
            range.deleteContents();
            range.insertNode(newNode);
        }

        selection.removeAllRanges();
    }
}

function isTextBold(range) {
    var parentNode = range.commonAncestorContainer.parentNode;
    return parentNode.nodeName === 'B' || parentNode.classList.contains('fw-bold');
}

function removeBold(range) {
    var parentNode = range.commonAncestorContainer.parentNode;

    if (parentNode.nodeName === 'B' || parentNode.classList.contains('fw-bold')) {
        var textNode = document.createTextNode(parentNode.textContent);
        parentNode.parentNode.replaceChild(textNode, parentNode);
    }
}


