"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearPrefab = void 0;
var file_util_1 = require("./file_util");
var fs = __importStar(require("fs"));
/**
* 遍历
 *
*/
var checkFlag = function (o, arr, result) {
    if (!o)
        return;
    result.push(o);
    if (o.target._children) {
        o.target._children.forEach(function (element) {
            checkFlag.bind(null, arr[element['__id__']], arr, result);
        });
    }
    if (o.target._components) {
        o.target._components.forEach(function (element) {
            checkFlag(arr[element['__id__']], arr, result);
        });
    }
    if (o.target._prefab) {
        checkFlag(arr[o.target._prefab['__id__']], arr, result);
    }
    if (o.target.__prefab) {
        checkFlag(arr[o.target.__prefab['__id__']], arr, result);
    }
    if (o.target._globals) {
        checkFlag(arr[o.target._globals['__id__']], arr, result);
    }
    if (o.target.ambient) {
        checkFlag(arr[o.target.ambient['__id__']], arr, result);
    }
    if (o.target.shadows) {
        checkFlag(arr[o.target.shadows['__id__']], arr, result);
    }
    if (o.target._skybox) {
        checkFlag(arr[o.target._skybox['__id__']], arr, result);
    }
    if (o.target.frog) {
        checkFlag(arr[o.target.frog['__id__']], arr, result);
    }
    if (o.target.instance) {
        checkFlag(arr[o.target.instance['__id__']], arr, result);
    }
    if (o.target.mountedChildren) {
        o.target.mountedChildren.forEach(function (element) {
            checkFlag(arr[element['__id__']], arr, result);
        });
    }
    if (o.target.mountedComponents) {
        o.target.mountedComponents.forEach(function (element) {
            checkFlag(arr[element['__id__']], arr, result);
        });
    }
    if (o.target.propertyOverrides) {
        o.target.propertyOverrides.forEach(function (element) {
            checkFlag(arr[element['__id__']], arr, result);
        });
    }
    if (o.target.removedComponents) {
        o.target.removedComponents.forEach(function (element) {
            checkFlag(arr[element['__id__']], arr, result);
        });
    }
};
//步骤一，生成T
var init = function (arr) {
    var r = [];
    arr.forEach(function (element, index) {
        r.push({ id: index, target: element, flag: true });
    });
    return r;
};
//查到所有指定类型的node
var findAllNodeByType = function (arr, key, typeStr) {
    var r = [];
    arr.forEach(function (element) {
        if (element.target[key] === typeStr) {
            r.push(element.id);
        }
    });
    return r;
};
//查找所有合法的
var createNewTree = function (arr, N) {
    var strs = [];
    var NN = [];
    arr.forEach(function (i) {
        N.forEach(function (element) {
            // if (JSON.stringify(element).indexOf(`"__id__":${i}`) > -1) {
            //     element.flag = false
            //     console.log('fffffffffffffffffffff', JSON.stringify(element))
            // }
            if (element === i) {
                element.flag = false;
            }
        });
    });
    N.forEach(function (element) {
        if (element.flag === true) {
            NN.push(element);
        }
    });
    return NN;
};
//修复id，并返回最终结果
var fixId = function (n, index, arr) {
    if (index === n.id) {
        return;
    }
    //修复
    var strs = [];
    var str = "";
    arr.forEach(function (element, ii) {
        str = JSON.stringify(element).replace("\"__id__\": " + n.id, "\"__id__\": " + index);
        str = str.replace("\"__id__\":" + n.id, "\"__id__\":" + index);
        arr[ii] = JSON.parse(str);
    });
    arr[index];
};
//根据要清除的节点id，清理整颗树，并返回新的树
var clearNodeTree = function (nodeIndex, N) {
    //获取需要删除的列表
    var needDelArr = [];
    checkFlag(N[nodeIndex], N, needDelArr);
    //生成合法的新树
    var NN = createNewTree(needDelArr, N);
    //依次修复新树不正确的id
    NN.forEach(function (element, index) {
        fixId(element, index, NN);
    });
    NN.forEach(function (element, index) {
        element.id = index;
    });
    //得到修复完的树
    return NN;
};
var doNodeWork = function (N, key, typeStr, start) {
    if (start === void 0) { start = 0; }
    var nodeIndexs = findAllNodeByType(N, key, typeStr);
    if (nodeIndexs.length > start) {
        var arr = clearNodeTree(nodeIndexs[start], N);
        return doNodeWork(arr, key, typeStr, start);
    }
    return N;
};
var alnalys = function (path, data) {
    var N = init(data);
    var beginIndex = path.lastIndexOf('\\') + 1;
    var endIndex = path.lastIndexOf('.');
    var name = path.substring(beginIndex, endIndex);
    var NN = doNodeWork(N, "__type__", "cc.Scene");
    NN = doNodeWork(NN, "_name", name, 1);
    var NNN = [];
    NN.forEach(function (element) {
        NNN.push(element.target);
    });
    console.log('检查', path);
    if (N.length === NN.length) {
        return;
    }
    // //写入新的文件
    console.log('修复====================================', path);
    fs.writeFile(path, JSON.stringify(NNN), function (err) {
        console.log(err);
    });
};
exports.clearPrefab = (function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var rs;
        return __generator(this, function (_a) {
            rs = [];
            file_util_1.fileSearch(Editor.Project.path, ".prefab", function (f) {
                fs.readFile(f, { encoding: "utf-8" }, function (err, data) {
                    alnalys(f + '', JSON.parse(data));
                });
            });
            return [2 /*return*/];
        });
    });
});
