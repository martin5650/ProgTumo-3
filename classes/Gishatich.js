

module.exports = class Gishatich {
    constructor(x, y, id) {
        this.x = x
        this.y = y
        this.id = id
        this.energy = 6
        this.multiply = 4
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooselCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooselCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 12 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1]

            var newGishatich = new Gishatich(newX, newY, this.id)
            gishatichArr.push(newGishatich)

            matrix[newY][newX] = this.id;
        }
    }

    move() {
        var emptyCells = this.chooselCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            this.multiply--

            this.energy--
        }
        this.die();
    }

    eat() {
        var emptyCells = this.chooselCell(2);
        var emptyCellsSoxak = this.chooselCell(5)
        emptyCells = emptyCells.concat(emptyCellsSoxak)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (this.energy > 0 && newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = this.id
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (var i in SoxakArr) {
                if (SoxakArr[i].x == newX && SoxakArr[i].y == newY) {
                    SoxakArr.splice(i, 1)
                }
            }
            this.energy++;
            this.mul();
        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }
}
