/*  plugin - dtree
    version - 1.0.0
*/

(function ($) {
    $.fn.dtree = function (options) {
        var $this = this,
            settings = $.extend({
                isHorizontal: false,
                customTemplate: false,
                gutter: 20,
                zoom: true,
                placeholderImg: "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg",
                isCollapsible: true,
                searchbox: true
            }, options),
            _parents = [],
            _nodeDims = {},
            _iniScale = 0,
            _domNodes = {},
            _dtreeID = $this.attr("id") || "dtree" + Math.round(Math.random() * 100),
            init = {
                logger: function () {
                    _parents = calc.getParentChildObj();
                    _nodeDims = init.getNodeDimensions();

                    $this.html(init.buildNodes(_nodeDims));
                    init.rearrangeDom();
                    init.setSelectors();
                    console.log(settings.nodes, _nodeDims, _parents);
                },
                buildNodes: function (nodeDims) {
                    if (settings.customTemplate) {

                    } else {
                        var activepid = _parents.rootNode.id,
                            pNodes = _parents.listParents.length,
                            ndPipe = [activepid],
                            nodeHTML = "<div class=\"dtree-wrapper " + (settings.isHorizontal ? 'dtree-x' : '') + "\">";

                        if (settings.searchbox) {
                            nodeHTML += "<div class=\"dtree-searchbox\"><input type=\"text\" class=\"dtree-search-control\"><i class=\"dtree-search-icon\"></i>" +
                                "<ul class=\"dtree-search-list\"></ul>" +
                                "</div>";
                        }


                        nodeHTML += "<div class=\"dtree-node-wrapper\" id=\"" + _dtreeID + "_node_0\" style=\"width:100%\">" +
                            "<div class=\"dtree-node-cell\">" +
                            "<div class=\"dtree-node-main\">" +
                            "<div class=\"dtree-node \" style=\"margin:" + settings.gutter + "px\">" +
                            "<div class=\"dtree-img\"><img src=\"" + (_parents.rootNode.img || settings.placeholderImg) + "\"></div>" +
                            "<div class=\"dtree-name\">" + _parents.rootNode.name + "<span class=\"sub\">" + _parents.rootNode.txt + "</span></div>" +
                            (settings.isCollapsible ? "<div class=\"node-collapse\" data-dtree-collpase-node=\"#" + _dtreeID + "_node_" + activepid + "\"  style=\"bottom : " + settings.gutter / 2 + "px\"></div>" : "");
                        nodeHTML += (settings.isHorizontal) ? "<i class=\"dtree-branch liney\" style=\"height:50%; top:50%; left: " + settings.gutter + "px; width: calc(100% - " + settings.gutter + "px)\"></i>" : "<i class=\"dtree-branch liney\" style=\"width:50%; left:50%; top: " + settings.gutter + "px; height: calc(100% - " + settings.gutter + "px)\"></i>";
                        nodeHTML += "</div></div><div class=\"dtree-child-container\" id=\"" + _dtreeID + "_node_" + activepid + "\"></div></div></div>";

                        while (pNodes && ndPipe.length) {
                            activepid = ndPipe.shift();
                            var childNdsObj = _parents.parentObj[_parents.listParents.indexOf(activepid)];
                            if (!childNdsObj) {
                                continue;
                            }
                            var childNds = childNdsObj.childNodes;

                            nodeHTML += "<div class=\"dtree-node-wrapper \" id=\"" + _dtreeID + "_parent_" + activepid + "\"  >";

                            for (var i = 0; i < childNds.length; i++) {
                                var isParent = (_parents.listParents.indexOf(childNds[i].id) !== -1),
                                    hasSiblings = childNds.length - 1,
                                    xRight = (i == 0) ? "0" : "50%",
                                    xWidth = "50%",
                                    isMiddle = (i > 0 && i < childNds.length - 1),
                                    imgSrc = childNds[i].img || settings.placeholderImg,
                                    parObj = _parents.parentObj[_parents.listParents.indexOf(childNds[i].id)],
                                    isCollapsedNode = childNds[i].isCollapsed;

                                if (isMiddle) {
                                    xWidth = "100%";
                                    xRight = "0";
                                }
                                settings.nodes[_parents.nodeById[childNds[i].id]].lvl = 1 + settings.nodes[_parents.nodeById[activepid]].lvl;
                                // width: 100/childNds.length
                                nodeHTML += "<div class=\"dtree-node-cell \"  >" +
                                    "<div class=\"dtree-node-main\">" +
                                    "<div class=\"dtree-node "+(isCollapsedNode && "dtree-collapsed")+"\" style=\"margin:" + settings.gutter + "px\">" +
                                    "<div class=\"dtree-img\"><img src=\"" + imgSrc + "\"></div>" +
                                    "<div class=\"dtree-name\">" + childNds[i].name + "<span class=\"sub\">" + childNds[i].txt + "</span></div>";
                                nodeHTML += isParent ? (settings.isCollapsible ? "<div class=\"node-collapse\" data-dtree-collpase-node=\"#" + _dtreeID + "_node_" + childNds[i].id + "\" style=\"bottom : " + settings.gutter / 2 + "px\"></div>" : "") : "";

                                if (settings.isHorizontal) {
                                    nodeHTML += (!isParent && parObj ? (parObj.childNodes.length > 1) : parObj) ? "<i class=\"dtree-branch liney\" ></i>" : "<i class=\"dtree-branch liney\" style=\"width:calc(100% - " + settings.gutter + "px); left: 0\"></i>";

                                } else {
                                    nodeHTML += (!isParent && parObj ? (parObj.childNodes.length > 1) : parObj) ? "<i class=\"dtree-branch liney\"></i>" : "<i class=\"dtree-branch liney\" style=\"height:calc(100% - " + settings.gutter + "px); top: 0\"></i>";
                                    nodeHTML += hasSiblings ? "<i class=\"dtree-branch linex\" style=\"right: " + xRight + "; width: " + xWidth + "\"></i>" : "";
                                }

                                nodeHTML += "</div></div>" +
                                    ((hasSiblings && (settings.isHorizontal)) ? "<i class=\"dtree-branch linex\" style=\"bottom: " + xRight + "; height: " + xWidth + "\"></i>" : "") +
                                    "<div class=\"dtree-child-container  "+(isCollapsedNode && "dtree-target-collapsed")+"\" id=\"" + _dtreeID + "_node_" + childNds[i].id + "\"></div></div>";
                                ndPipe.push(childNds[i].id);
                            }
                            nodeHTML += "</div>";
                            pNodes--;
                        }


                        return nodeHTML + "</div>";
                    }
                },
                rearrangeDom: function () {
                    var $parents = $this.find(".dtree-node-wrapper").not("#" + _dtreeID + "_node_0"),
                        $childs = $this.find(".dtree-child-container");

                    $parents.each(function () {
                        var custNodeId = $(this).attr("id").split("_"),
                            cutNode = $(this).detach(),
                            pasteNode = $childs.filter("#" + _dtreeID + "_node_" + custNodeId[custNodeId.length - 1]);
                        if (pasteNode) {
                            cutNode.appendTo(pasteNode);
                        }
                    });
                },
                getNodeDimensions: function () {
                    $('body').append("<div id=\"tempNode\"><div class=\"dtree-node\"><div class=\"dtree-img\"><img src=\"https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg\"></div> <div class=\"dtree-name\">mmmmmmmmmm</div><span class=\"dtree-branch\"><i></i><i></i></span></div></div>");
                    var $tempNode = $("#tempNode");
                    var tw = $tempNode.children().eq(0).outerWidth(true),
                        th = $tempNode.children().eq(0).outerHeight(true);

                    $tempNode.remove();
                    return {
                        nodeWidth: tw,
                        nodeHeight: th
                    };
                },
                setSelectors: function () {
                    _domNodes.nodes = $this.find(".dtree-node");
                    _domNodes.nodeContainers = $this.find(".dtree-node-main");
                    _domNodes.nodeCollapseToggles = $this.find(".node-collapse");
                    _domNodes.searchControl = $this.find(".dtree-search-control");
                    _domNodes.searchResults = $this.find(".dtree-search-list");

                    _domNodes.nodeCollapseToggles.on("click", handlers.onToggleCollapseClick);
                    _domNodes.searchControl.on("keyup", handlers.onSearchKeyup);
                    _domNodes.searchControl.on("blur", handlers.onSearchBlur);
                    $this.on("mousedown", handlers.onBoardMouseDown);
                    $this.on("mouseup", handlers.onBoardMouseUp);
                },
                buildSearchResults: function (listObj, skey) {
                    var listHTML = "";
                    for (var i = 0; i < listObj.length; i++) {
                        // var si = listObj[i].name.indexOf(skey) !== -1 ? listObj[i].name.indexOf(skey) : listObj[i].txt.indexOf(skey),
                        //     name = listObj[i]

                        listHTML += "<li>" + listObj[i].name + "</li>";
                    }

                    _domNodes.searchResults.html(listHTML);
                }
            },
            handlers = {
                onToggleCollapseClick: function (e) {
                    var $thisBtn = $(this),
                        $target = $($thisBtn.attr("data-dtree-collpase-node"));
                    $thisBtn.parent().toggleClass("dtree-collapsed");
                    $target.toggleClass("dtree-target-collapsed");
                },
                onSearchKeyup: function () {
                    var searchKey = $(this).val(),
                        resultSet = [];

                    resultSet = settings.nodes.filter(function (i, n) {
                        return (i.name.indexOf(searchKey) !== -1 || i.txt.indexOf(searchKey) !== -1);
                    });

                    init.buildSearchResults(resultSet, searchKey);
                },
                onSearchBlur: function () {
                    _domNodes.searchResults.html("");
                },
                onBoardMouseDown: function (e) {
                    _iniScale = e.offsetX;
                    $this.on("mousemove", handlers.onBoardMouseMove);
                },
                onBoardMouseUp: function (e) {
                    $this.off("mousemove", handlers.onBoardMouseMove);
                },
                onBoardMouseMove: function (e) {
                    e.preventDefault();
                    var pleft = _iniScale - e.offsetX;
                    $this.children().eq(0).scrollLeft($this.children().eq(0).scrollLeft() + pleft);
                },
                onScroll: function () {

                },
                onWheel: function (event) {
                    return;
                    event.preventDefault();
                    _iniScale = 0;
                    console.log(event.originalEvent);
                    if (!event.originalEvent.wheelDelta) {
                        if (event.deltaY < 0) {
                            _iniScale += 0.08;
                        } else {
                            _iniScale -= 0.05;
                        }
                    } else {
                        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                            _iniScale + 0.08;
                        } else {
                            _iniScale -= 0.05;
                        }
                    }

                    $this.children().eq(0).css("transform", "scale(" + _iniScale + ")");
                }
            },
            calc = {
                getParentChildObj: function () {
                    var nodes = settings.nodes,
                        keyNodeId = {},
                        parents = nodes.map(function (i, n) {
                            var childNd = nodes.filter(function (k) {
                                return k.pid == i.id
                            });
                            keyNodeId[i.id] = n;
                            return {
                                pid: i.id,
                                pname: i.name,
                                childNodes: childNd
                            }
                        }).filter(function (i) {
                            return i.childNodes.length
                        });

                    return {
                        parentObj: parents,
                        listParents: parents.map(function (i) {
                            return i.pid
                        }),
                        rootNode: nodes.filter(function (i) {
                            return i.pid == 0
                        })[0],
                        nodeById: keyNodeId
                    };
                }
            };

        init.logger();
        return $this;
    }
}(jQuery));
/* usage */
$(document).ready(function(){

var treeNodes = [
    {
        id: 71,
        pid: 0,
        name: "Presidencia",
        txt: "DIF CRI",
        img: ""
    },
    {
        id: 79,
        pid: 71,
        name: "Direccion",
        txt: "DIF CRI",
        img: ""
    },
    {
        id: 26,
        pid: 79,
        name: "Jefatura",
        txt: "Psicologia",
        img: ""
    },
    {
        id: 27,
        pid: 79,
        name: "Jefatura",
        txt: "Juridica",
        img: ""
    },
    {
        id: 28,
        pid: 79,
        name: "Jefatura",
        txt: "Comunidad y Bienestar Familiar",
        img: ""
    },
    {
        id: 29,
        pid: 79,
        name: "Jefatura",
        txt: "CRI",
        img: ""
    },
    {
        id: 30,
        pid: 79,
        name: "Subdireccion",
        txt: "De la Mujer y Juventud",
        img: ""
    },
    {
        id: 80,
        pid: 30,
        name: "Jefatura",
        txt: "De la Juventud",
        img: ""
    },
];
  $("#ochart").dtree({
    isHorizontal: false,
    nodes : treeNodes
  });
});