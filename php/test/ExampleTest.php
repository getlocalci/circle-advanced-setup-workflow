<?php

declare(strict_types=1);

namespace Asw\ExamplePhp;

use PHPUnit\Framework\TestCase;

/**
 * @small
 *
 * @covers \Asw\ExamplePhp
 */
class ExampleTest extends TestCase
{
    public function testMultiply(): void
    {
        $instance = new Example();
        $this->assertEquals(12, $instance->multiply(4, 3));
    }
}
