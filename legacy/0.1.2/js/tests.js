define([], function () {
    return function tests(describe, factory) {

        describe("A composed app", function (it) {
            const app = factory();
            const lens = app.lens;

            it("should produce a simple view", function (expect) {
                const expected = ["b", "Hello, ", "World", "! (", "xyz314159265", ")"]
                expect(app()).toEqual(expected);
            });

            it("should support setting lens values", function (expect) {
                app.over(lens, { who: "Universe", apiKey: "answer42" });

                expect(app()).toEqual(
                    ["b", "Hello, ", "Universe", "! (", "answer42", ")"]
                );
            });

            it("should be OK with idempotent state transitions", function (expect) {
                app.over(lens, { who: "Universe" });

                expect(app()).toEqual(
                    ["b", "Hello, ", "Universe", "! (", "answer42", ")"]
                );
            });

            it("should provide a subscription mechanism", function (expect) {
                const sut = factory();

                let triggered = 0;
                sut.listen(lens, function (/* state */) {
                    //describe.trace("listen", state);
                    triggered += 1;
                });
                expect(triggered).toEqual(0);

                sut.over(lens, { apiKey: "nothing" });
                sut.over(lens, { bogus: "" });

                expect(triggered).toEqual(1);
                expect(sut()).toEqual(
                    ["b", "Hello, ", "World", "! (", "nothing", ")"]
                );
            });

        });
        
    };
})