# aoc

My [Advent of Code](https://adventofcode.com/) solutions public repo made in Node.js and TypeScript.

### Use ar your own risk

The "day-" folder structure should export two methods: `firstPart()` and `secondPart()`. Why this? Pretty obvious if you know how AoC works.

```
export const firstPart = (): any => {

}

export const secondPart = (): any => {

}
```

Launch each day solution with the following command

```
$ yarn solve <year> <day>
```

For example, to see the solution for day 1 of 2022 you should launch

```
$ yarn solve 2022 1
```

![screenshot](https://i.imgur.com/wpngl9L.png)

### My rules

- I don't strive for "elegant" code or exotic language usages and I'll use `lodash` (and other libraries) if I need to.
- Everything in a single file, excluding input

### No shame if it works reasonably. 😉

## LEGAL STUFF

THE FILES (FROM NOW, "THE SOFTWARE") ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
